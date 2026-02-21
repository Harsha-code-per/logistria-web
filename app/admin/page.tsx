"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  writeBatch,
  doc,
  addDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Box,
} from "lucide-react";
import { toast } from "sonner";

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
  category: string;
}

interface Order {
  id: string;
  productName: string;
  quantity: number;
  userEmail: string;
  status: string;
  timestamp: Timestamp | null;
}

const NY_LAT_BASE = 40.712;
const NY_LNG_BASE = -74.006;
const rand = (min: number, max: number) =>
  +(Math.random() * (max - min) + min).toFixed(4);

async function initializeWorldState() {
  const batch = writeBatch(db);

  const trucks = [
    { name: "TRK-Alpha-01", status: "MOVING" },
    { name: "TRK-Beta-02", status: "DELAYED" },
    { name: "TRK-Gamma-03", status: "MOVING" },
    { name: "TRK-Delta-04", status: "MOVING" },
    { name: "TRK-Epsilon-05", status: "DELAYED" },
  ];
  trucks.forEach((t) => {
    const ref = doc(collection(db, "trucks"));
    batch.set(ref, {
      ...t,
      lat: rand(NY_LAT_BASE - 0.15, NY_LAT_BASE + 0.15),
      lng: rand(NY_LNG_BASE - 0.15, NY_LNG_BASE + 0.15),
      updatedAt: Timestamp.now(),
    });
  });

  const inventory = [
    { name: "Semiconductors", stock: rand(500, 5000), unit: "units", category: "Electronics" },
    { name: "Engine Blocks", stock: rand(20, 200), unit: "units", category: "Automotive" },
    { name: "Fiber Optic Cables", stock: rand(1000, 10000), unit: "meters", category: "Infrastructure" },
  ];
  inventory.forEach((item) => {
    const ref = doc(collection(db, "inventory"));
    batch.set(ref, { ...item, updatedAt: Timestamp.now() });
  });

  await batch.commit();
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function AdminPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);
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
    const unsubInv = onSnapshot(collection(db, "inventory"), (snap) => {
      setInventory(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<InventoryItem, "id">) }))
      );
    });
    const unsubOrders = onSnapshot(collection(db, "orders"), (snap) => {
      setOrders(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) }))
      );
    });
    return () => {
      unsubInv();
      unsubOrders();
    };
  }, [authLoading]);

  async function handleInitialize() {
    setInitializing(true);
    try {
      await initializeWorldState();
      toast.success("World State initialized! Firestore updated with mock data.");
    } catch {
      toast.error("Failed to initialize world state.");
    } finally {
      setInitializing(false);
    }
  }

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/login");
  }

  // ── Add Inventory SKU form state ──────────────────────────
  const [invForm, setInvForm] = useState({ name: "", category: "", stock: "" });
  const [addingInv, setAddingInv] = useState(false);

  async function handleAddInventory(e: React.FormEvent) {
    e.preventDefault();
    if (!invForm.name || !invForm.category || !invForm.stock) return;
    setAddingInv(true);
    try {
      await addDoc(collection(db, "inventory"), {
        name: invForm.name.trim(),
        category: invForm.category.trim(),
        stock: parseFloat(invForm.stock),
        unit: "units",
        updatedAt: Timestamp.now(),
      });
      toast.success(`"${invForm.name}" added to inventory.`);
      setInvForm({ name: "", category: "", stock: "" });
    } catch {
      toast.error("Failed to add inventory item.");
    } finally {
      setAddingInv(false);
    }
  }

  // ── Register Fleet Asset form state ───────────────────────
  const [truckForm, setTruckForm] = useState({ id: "", lat: "", lng: "" });
  const [addingTruck, setAddingTruck] = useState(false);

  async function handleAddTruck(e: React.FormEvent) {
    e.preventDefault();
    if (!truckForm.id || !truckForm.lat || !truckForm.lng) return;
    setAddingTruck(true);
    try {
      await setDoc(doc(db, "trucks", truckForm.id.trim()), {
        name: truckForm.id.trim(),
        lat: parseFloat(truckForm.lat),
        lng: parseFloat(truckForm.lng),
        status: "IDLE",
        updatedAt: Timestamp.now(),
      });
      toast.success(`Truck "${truckForm.id}" dispatched successfully.`);
      setTruckForm({ id: "", lat: "", lng: "" });
    } catch {
      toast.error("Failed to register truck.");
    } finally {
      setAddingTruck(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#081021] flex items-center justify-center">
        <Loader2 className="size-8 text-[#FF8C00] animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#081021] text-white">
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
        className="sticky top-0 z-50 bg-[#081021]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4"
      >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="size-6 text-[#FF8C00]" />
            <span
              className="text-lg font-black tracking-[0.2em] text-white"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              LOGISTRIA
            </span>
            <span className="hidden sm:block text-white/20 mx-2">|</span>
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
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Global Operations Control
            </h1>
          </div>
          <p className="text-slate-400 ml-10 text-sm tracking-wide">
            Real-time telemetry · Inventory management · Order processing
          </p>
        </motion.div>

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
              className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center gap-4"
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
                <p className="text-xs text-slate-400 uppercase tracking-widest">{stat.label}</p>
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

        {/* Initialize World State */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="bg-slate-900/50 backdrop-blur-md border border-[#FF8C00]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ boxShadow: "0 0 40px rgba(255,140,0,0.08)" }}
        >
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="size-5 text-[#FF8C00]" />
              Data Injection Panel
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Populate Firestore with mock trucks, inventory, and set system to operational state.
            </p>
          </div>
          <Button
            onClick={handleInitialize}
            disabled={initializing}
            className="shrink-0 bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold px-6 h-11 shadow-lg shadow-[#FF8C00]/40 hover:shadow-[#FF8C00]/60 transition-all duration-200 hover:scale-[1.02] tracking-wider"
          >
            {initializing ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Initializing…
              </>
            ) : (
              <>
                <Zap className="size-4" />
                Initialize World State (Demo)
              </>
            )}
          </Button>
        </motion.div>

        {/* ── Manual Data Entry Forms ─────────────────────────── */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Card 1 — Add Inventory SKU */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00C9B1]/10 border border-[#00C9B1]/20">
                <Box className="size-4 text-[#00C9B1]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-wide">Add New Product</h2>
                <p className="text-slate-500 text-xs">Push a new SKU to the inventory collection</p>
              </div>
            </div>
            <form onSubmit={handleAddInventory} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Product Name
                </label>
                <Input
                  placeholder="e.g. Lithium Batteries"
                  value={invForm.name}
                  onChange={(e) => setInvForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className="bg-black/40 border-white/10 text-white placeholder:text-slate-600 focus:border-[#00C9B1] h-10"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Category
                </label>
                <Input
                  placeholder="e.g. Energy"
                  value={invForm.category}
                  onChange={(e) => setInvForm((f) => ({ ...f, category: e.target.value }))}
                  required
                  className="bg-black/40 border-white/10 text-white placeholder:text-slate-600 focus:border-[#00C9B1] h-10"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Initial Stock
                </label>
                <Input
                  type="number"
                  min={0}
                  placeholder="e.g. 5000"
                  value={invForm.stock}
                  onChange={(e) => setInvForm((f) => ({ ...f, stock: e.target.value }))}
                  required
                  className="bg-black/40 border-white/10 text-white placeholder:text-slate-600 focus:border-[#00C9B1] h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <Button
                type="submit"
                disabled={addingInv}
                className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-black font-bold tracking-wider text-sm shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-200"
              >
                {addingInv ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <Box className="size-4" />
                    Add to Inventory
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Card 2 — Register Fleet Asset */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#FF8C00]/10 border border-[#FF8C00]/20">
                <Truck className="size-4 text-[#FF8C00]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-wide">Register New Truck</h2>
                <p className="text-slate-500 text-xs">Add a fleet asset to the trucks collection</p>
              </div>
            </div>
            <form onSubmit={handleAddTruck} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Truck ID
                </label>
                <Input
                  placeholder="e.g. TRK-009"
                  value={truckForm.id}
                  onChange={(e) => setTruckForm((f) => ({ ...f, id: e.target.value }))}
                  required
                  className="bg-black/40 border-white/10 text-white placeholder:text-slate-600 focus:border-[#FF8C00] h-10 font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Starting Latitude
                </label>
                <Input
                  type="number"
                  step="any"
                  placeholder="e.g. 40.7128"
                  value={truckForm.lat}
                  onChange={(e) => setTruckForm((f) => ({ ...f, lat: e.target.value }))}
                  required
                  className="bg-black/40 border-white/10 text-white placeholder:text-slate-600 focus:border-[#FF8C00] h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Starting Longitude
                </label>
                <Input
                  type="number"
                  step="any"
                  placeholder="e.g. -74.0060"
                  value={truckForm.lng}
                  onChange={(e) => setTruckForm((f) => ({ ...f, lng: e.target.value }))}
                  required
                  className="bg-black/40 border-white/10 text-white placeholder:text-slate-600 focus:border-[#FF8C00] h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <Button
                type="submit"
                disabled={addingTruck}
                className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-black font-bold tracking-wider text-sm shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200"
              >
                {addingTruck ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <Truck className="size-4" />
                    Dispatch Truck
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Inventory Table */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <Package className="size-5 text-[#00C9B1]" />
            <h2 className="text-base font-bold text-white tracking-wide">
              Live Inventory
            </h2>
            <span className="ml-auto text-xs text-slate-500 flex items-center gap-1">
              <div className="size-1.5 rounded-full bg-[#00C9B1] animate-pulse" />
              REAL-TIME
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-slate-400 uppercase text-xs tracking-widest">Product</TableHead>
                <TableHead className="text-slate-400 uppercase text-xs tracking-widest">Category</TableHead>
                <TableHead className="text-slate-400 uppercase text-xs tracking-widest">Stock</TableHead>
                <TableHead className="text-slate-400 uppercase text-xs tracking-widest">Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.length === 0 ? (
                <TableRow className="border-white/5">
                  <TableCell colSpan={4} className="text-center text-slate-500 py-10 italic">
                    No inventory data. Click "Initialize World State" to populate.
                  </TableCell>
                </TableRow>
              ) : (
                inventory.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <TableCell className="font-semibold text-white">{item.name}</TableCell>
                    <TableCell>
                      <Badge className="bg-[#00C9B1]/10 text-[#00C9B1] border border-[#00C9B1]/30 hover:bg-[#00C9B1]/20">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#FF8C00] font-mono font-bold">
                      {typeof item.stock === "number"
                        ? Math.floor(item.stock).toLocaleString()
                        : item.stock}
                    </TableCell>
                    <TableCell className="text-slate-400">{item.unit}</TableCell>
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
          className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <ClipboardList className="size-5 text-[#FF8C00]" />
            <h2 className="text-base font-bold text-white tracking-wide">
              Incoming Orders
            </h2>
            <span className="ml-auto text-xs text-slate-500 flex items-center gap-1">
              <div className="size-1.5 rounded-full bg-[#FF8C00] animate-pulse" />
              REAL-TIME
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-slate-400 uppercase text-xs tracking-widest">Product</TableHead>
                <TableHead className="text-slate-400 uppercase text-xs tracking-widest">Quantity</TableHead>
                <TableHead className="text-slate-400 uppercase text-xs tracking-widest">Client</TableHead>
                <TableHead className="text-slate-400 uppercase text-xs tracking-widest">Status</TableHead>
                <TableHead className="text-slate-400 uppercase text-xs tracking-widest">Received</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow className="border-white/5">
                  <TableCell colSpan={5} className="text-center text-slate-500 py-10 italic">
                    No orders yet. Orders placed from the storefront will appear here.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <TableCell className="font-semibold text-white">{order.productName}</TableCell>
                    <TableCell className="font-mono text-white">{order.quantity}</TableCell>
                    <TableCell className="text-slate-400 text-sm">{order.userEmail}</TableCell>
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
                    <TableCell className="text-slate-500 text-sm">
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
