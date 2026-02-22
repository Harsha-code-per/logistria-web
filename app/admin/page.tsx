"use client";

import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  writeBatch,
  doc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Zap,
  Package,
  ClipboardList,
  Truck,
  LogOut,
  Loader2,
  Radio,
  Database,
} from "lucide-react";
import { toast } from "sonner";

interface InventoryItem {
  id: string;
  // CSV fields
  product_id?: string;
  current_stock?: number;
  reserved_stock?: number;
  warehouse_location?: string;
  inventory_type?: string;
  last_updated?: string;
  // legacy fields (kept for backward compatibility)
  name?: string;
  stock?: number;
  unit?: string;
  category?: string;
  [key: string]: unknown;
}

interface Order {
  id: string;
  productName: string;
  quantity: number;
  userEmail: string;
  status: string;
  timestamp: Timestamp | null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

// ── Per-CSV schema config ───────────────────────────────────────────────────
type CsvConfig = {
  label: string;
  description: string;
  collection: string;
  /** Use a single CSV column as the Firestore doc ID */
  docIdField: string | null;
  /** Build a composite doc ID from multiple columns joined by "_" */
  compoundIdFields?: string[];
  /** These column values are cast to numbers before writing */
  numericFields: string[];
  hint: string;
};

const CSV_CONFIGS: Record<string, CsvConfig> = {
  inventory: {
    label: "Inventory",
    description: "Product stock levels & warehouse locations",
    collection: "inventory",
    docIdField: "product_id",
    numericFields: ["current_stock", "reserved_stock"],
    hint: "product_id, current_stock, reserved_stock, warehouse_location, last_updated, inventory_type",
  },
  logistics_vehicles: {
    label: "Fleet Vehicles",
    description: "Trucks & vans with positions and capacity",
    collection: "trucks",
    docIdField: "vehicle_id",
    numericFields: ["capacity_qty", "lat", "lng"],
    hint: "vehicle_id, type, capacity_qty, delivery_mode, lat, lng",
  },
  logistics_customers: {
    label: "Customers",
    description: "Customer locations and product demand",
    collection: "logistics_customers",
    docIdField: "customer_id",
    numericFields: ["lat", "lng", "demand_qty", "pin", "cost"],
    hint: "customer_id, name, lat, lng, demand_qty, product_id, pin, cost",
  },
  warehouse: {
    label: "Warehouses",
    description: "Warehouse capacity and geo-coordinates",
    collection: "warehouses",
    docIdField: "warehouse_id",
    numericFields: ["max_capacity", "current_occupied", "lat", "lng"],
    hint: "warehouse_id, name, max_capacity, current_occupied, lat, lng",
  },
  bom: {
    label: "Bill of Materials",
    description: "Finished-product → component relationships",
    collection: "bom",
    docIdField: null,
    compoundIdFields: ["finished_product_id", "component_product_id"],
    numericFields: ["quantity_required"],
    hint: "finished_product_id, component_product_id, quantity_required",
  },
  material_planning: {
    label: "Material Planning",
    description: "EOQ, safety stock and lead times per material",
    collection: "material_planning",
    docIdField: "material_id",
    numericFields: ["average_daily_demand", "lead_time_days", "safety_stock", "economic_order_quantity"],
    hint: "material_id, average_daily_demand, lead_time_days, safety_stock, policy_type, economic_order_quantity",
  },
  supplier_product: {
    label: "Supplier Products",
    description: "Pricing, lead times and quality scores by supplier",
    collection: "supplier_product",
    docIdField: null,
    compoundIdFields: ["supplier_id", "product_id"],
    numericFields: ["cost_per_unit", "lead_time_days", "minimum_order_quantity", "transport_cost", "quality_score"],
    hint: "supplier_id, product_id, cost_per_unit, lead_time_days, minimum_order_quantity, transport_cost, quality_score",
  },
  supplier_performance: {
    label: "Supplier Performance",
    description: "On-time rates, defect rates and delay metrics",
    collection: "supplier_performance",
    docIdField: null,
    compoundIdFields: ["supplier_id", "product_id"],
    numericFields: ["on_time_delivery_rate", "average_delay_days", "defect_rate"],
    hint: "supplier_id, product_id, on_time_delivery_rate, average_delay_days, defect_rate, last_updated",
  },
  supplier_order_stages: {
    label: "Supplier Order Stages",
    description: "Pipeline stages, timings and throughput per supplier",
    collection: "supplier_order_stages",
    docIdField: null,
    compoundIdFields: ["supplier_id", "stage_order"],
    numericFields: ["stage_order", "avg_time_hours", "max_output_per_day"],
    hint: "supplier_id, stage_name, stage_order, avg_time_hours, max_output_per_day, description",
  },
};

export default function AdminPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      } else {
        setUserEmail(user.email);
        setAuthLoading(false);
      }
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    if (authLoading) return;
    const unsubInv = onSnapshot(
      collection(db, "inventory"),
      (snap) => {
        setInventory(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<InventoryItem, "id">) }))
        );
      },
      (err) => {
        console.error("Inventory snapshot error:", err);
        toast.error(`Failed to load inventory: ${err.message}`);
      }
    );
    const unsubOrders = onSnapshot(
      collection(db, "orders"),
      (snap) => {
        setOrders(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) }))
        );
      },
      (err) => {
        console.error("Orders snapshot error:", err);
        toast.error(`Failed to load orders: ${err.message}`);
      }
    );
    return () => {
      unsubInv();
      unsubOrders();
    };
  }, [authLoading]);

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/login");
  }

  // ── Bulk ERP Import state ──────────────────────────────────
  const [csvCollection, setCsvCollection] = useState<string>("inventory");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvUploading, setCsvUploading] = useState(false);
  const csvInputRef = useRef<HTMLInputElement>(null);

  async function handleFileUpload() {
    if (!csvFile) {
      toast.error("Please select a file first.");
      return;
    }
    const cfg = CSV_CONFIGS[csvCollection];
    setCsvUploading(true);

    // Shared Firebase batch-write for any parsed row array
    async function commitRows(rows: Record<string, unknown>[]) {
      const filtered = rows.filter((r) =>
        Object.values(r).some((v) => String(v ?? "").trim() !== "")
      );
      if (filtered.length === 0) {
        toast.error("File is empty or has no valid rows.");
        return;
      }
      const batch = writeBatch(db);
      filtered.forEach((row) => {
        let ref;
        if (cfg.compoundIdFields && cfg.compoundIdFields.length > 0) {
          const id = cfg.compoundIdFields.map((f) => String(row[f] ?? "").trim()).join("_");
          ref = doc(db, cfg.collection, id);
        } else if (cfg.docIdField && String(row[cfg.docIdField] ?? "").trim()) {
          ref = doc(db, cfg.collection, String(row[cfg.docIdField]).trim());
        } else {
          ref = doc(collection(db, cfg.collection));
        }
        const data: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(row)) {
          const trimmed = String(v ?? "").trim();
          data[k] = cfg.numericFields.includes(k) ? (parseFloat(trimmed) || 0) : trimmed;
        }
        data.updatedAt = Timestamp.now();
        batch.set(ref, data);
      });
      await batch.commit();
      toast.success(
        `${filtered.length} record${filtered.length !== 1 ? "s" : ""} imported into "${cfg.collection}".`
      );
      setCsvFile(null);
      if (csvInputRef.current) csvInputRef.current.value = "";
    }

    try {
      const ext = csvFile.name.split(".").pop()?.toLowerCase();

      if (ext === "csv") {
        // ── CSV path: PapaParse ──────────────────────────────────
        const results = await new Promise<Papa.ParseResult<Record<string, string>>>(
          (resolve, reject) =>
            Papa.parse<Record<string, string>>(csvFile, {
              header: true,
              skipEmptyLines: true,
              complete: resolve,
              error: reject,
            })
        );
        await commitRows(results.data as Record<string, unknown>[]);

      } else if (ext === "xlsx" || ext === "xls") {
        // ── Excel path: SheetJS ─────────────────────────────────
        await new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const buffer = new Uint8Array(e.target!.result as ArrayBuffer);
              const workbook = XLSX.read(buffer, { type: "array" });
              const sheetName = workbook.SheetNames[0];
              const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(
                workbook.Sheets[sheetName]
              );
              await commitRows(jsonData);
              resolve();
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsArrayBuffer(csvFile);
        });

      } else {
        toast.error("Unsupported file type. Please upload a .csv, .xlsx, or .xls file.");
      }
    } catch {
      toast.error("Failed to process file. Check the format and try again.");
    } finally {
      setCsvUploading(false);
    }
  }


  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#081021] flex items-center justify-center">
        <Loader2 className="size-8 text-[#FF8C00] animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#081021] text-slate-900 dark:text-white">
      {/* Ambient grid */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,140,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-[#081021]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-6 py-4"
      >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="size-6 text-[#FF8C00]" />
            <span
              className="text-lg font-black tracking-[0.2em] text-slate-900 dark:text-white"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              LOGISTRIA
            </span>
            <span className="hidden sm:block text-slate-300 dark:text-white/20 mx-2">|</span>
            <span className="hidden sm:block text-slate-400 text-sm font-medium tracking-widest uppercase">
              Admin Portal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-[#00C9B1] animate-pulse" />
              <span className="text-slate-400 text-sm hidden md:block">{userEmail}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline ml-1">Sign Out</span>
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-screen-2xl mx-auto px-6 py-10 space-y-10">
        {/* Page Title */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-1">
            <Globe className="size-7 text-[#FF8C00]" />
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Global Operations Control
            </h1>
          </div>
          <p className="text-slate-400 ml-10 text-sm tracking-wide">
            Real-time telemetry · Inventory management · Order processing
          </p>        </motion.div>

        {/* Stats Row */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Active Trucks", value: "5", icon: Truck, color: "#FF8C00" },
            { label: "Inventory SKUs", value: inventory.length.toString(), icon: Package, color: "#00C9B1" },
            { label: "Total Orders", value: orders.length.toString(), icon: ClipboardList, color: "#FF8C00" },
            { label: "System Status", value: "ONLINE", icon: Radio, color: "#00C9B1" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl p-4 flex items-center gap-4"
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon
                  className="size-5"
                  style={{ color: stat.color }}
                />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p
                  className="text-xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── CSV Data Injection ─────────────────────────────── */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-2xl"
        >
          <div
            className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-[#00C9B1]/20 rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 0 40px rgba(0,201,177,0.07)" }}
          >
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00C9B1]/10 border border-[#00C9B1]/20">
                <Database className="size-4 text-[#00C9B1]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Bulk ERP Import (CSV/Excel)</h2>
                <p className="text-slate-500 text-xs">Batch-ingest records from a CSV or Excel ERP export</p>
              </div>
            </div>
            <div className="p-6 space-y-5">
              {/* Collection selector */}
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Target Collection
                </label>
                <select
                  value={csvCollection}
                  onChange={(e) => {
                    setCsvCollection(e.target.value);
                    setCsvFile(null);
                    if (csvInputRef.current) csvInputRef.current.value = "";
                  }}
                  className="w-full h-10 px-3 rounded-md bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00C9B1] transition-colors appearance-none cursor-pointer"
                >
                  {Object.entries(CSV_CONFIGS).map(([key, cfg]) => (
                    <option key={key} value={key}>
                      {cfg.label}
                    </option>
                  ))}
                </select>
                {/* Description pill */}
                <p className="text-slate-500 text-xs mt-1">
                  {CSV_CONFIGS[csvCollection].description}
                </p>
              </div>

              {/* File input */}
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  File (CSV or Excel)
                </label>
                <input
                  ref={csvInputRef}
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  onChange={(e) => setCsvFile(e.target.files?.[0] ?? null)}
                  className="w-full h-10 text-sm text-slate-500 dark:text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#00C9B1]/10 file:text-[#00C9B1] hover:file:bg-[#00C9B1]/20 file:cursor-pointer cursor-pointer bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-md px-3 focus:outline-none focus:border-[#00C9B1] transition-colors"
                />
                {/* Dynamic column hint */}
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {CSV_CONFIGS[csvCollection].hint.split(", ").map((col) => (
                    <span
                      key={col}
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5"
                    >
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleFileUpload}
                disabled={csvUploading || !csvFile}
                className="w-full h-10 bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-black font-bold tracking-wider text-sm shadow-lg shadow-teal-500/20 hover:shadow-teal-500/50 transition-all duration-200"
              >
                {csvUploading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Database className="size-4" />
                    Process &amp; Upload File
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center gap-3">
            <Package className="size-5 text-[#00C9B1]" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">
              Live Inventory
            </h2>
            <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <div className="size-1.5 rounded-full bg-[#00C9B1] animate-pulse" />
              REAL-TIME
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 dark:border-white/10 hover:bg-transparent">
                <TableHead className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-widest">Product ID</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-widest">Type</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-widest">Current Stock</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-widest">Reserved</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-widest">Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.length === 0 ? (
                <TableRow className="border-slate-100 dark:border-white/5">
                  <TableCell colSpan={5} className="text-center text-slate-400 dark:text-slate-500 py-10 italic">
                    No inventory data. Upload an inventory CSV to populate.
                  </TableCell>
                </TableRow>
              ) : (
                inventory.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <TableCell className="font-semibold text-slate-900 dark:text-white font-mono text-sm">
                      {item.product_id ?? item.name ?? item.id}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-[#00C9B1]/10 text-[#00C9B1] border border-[#00C9B1]/30 hover:bg-[#00C9B1]/20">
                        {item.inventory_type ?? item.category ?? "—"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#FF8C00] font-mono font-bold">
                      {item.current_stock !== undefined
                        ? Math.floor(Number(item.current_stock)).toLocaleString()
                        : item.stock !== undefined
                        ? Math.floor(Number(item.stock)).toLocaleString()
                        : "—"}
                    </TableCell>
                    <TableCell className="text-slate-500 dark:text-slate-400 font-mono text-sm">
                      {item.reserved_stock !== undefined ? Math.floor(Number(item.reserved_stock)).toLocaleString() : "—"}
                    </TableCell>
                    <TableCell className="text-slate-500 dark:text-slate-400 text-sm">
                      {item.warehouse_location ?? item.unit ?? "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center gap-3">
            <ClipboardList className="size-5 text-[#FF8C00]" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">
              Incoming Orders
            </h2>
            <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <div className="size-1.5 rounded-full bg-[#FF8C00] animate-pulse" />
              REAL-TIME
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 dark:border-white/10 hover:bg-transparent">
                <TableHead className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-widest">Product</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-widest">Quantity</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-widest">Client</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-widest">Status</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-widest">Received</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow className="border-slate-100 dark:border-white/5">
                  <TableCell colSpan={5} className="text-center text-slate-400 dark:text-slate-500 py-10 italic">
                    No orders yet. Orders placed from the storefront will appear here.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <TableCell className="font-semibold text-slate-900 dark:text-white">{order.productName}</TableCell>
                    <TableCell className="font-mono text-slate-900 dark:text-white">{order.quantity}</TableCell>
                    <TableCell className="text-slate-500 dark:text-slate-400 text-sm">{order.userEmail}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          order.status === "PENDING"
                            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                            : order.status === "FULFILLED"
                            ? "bg-[#00C9B1]/10 text-[#00C9B1] border border-[#00C9B1]/30"
                            : "bg-red-500/10 text-red-400 border border-red-500/30"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 dark:text-slate-500 text-sm">
                      {order.timestamp
                        ? new Date(order.timestamp.toDate()).toLocaleString()
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </main>
  );
}
