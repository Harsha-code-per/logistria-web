"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  LogOut,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  pricePerUnit: string;
  unit: string;
  badge: string;
}

const CATALOG: Product[] = [
  {
    id: "PDI-001",
    name: "Industrial Semiconductors",
    category: "Electronics",
    description:
      "High-performance chips engineered for aerospace, defense, and advanced manufacturing pipelines. Lot-certified.",
    pricePerUnit: "$45,000",
    unit: "per lot",
    badge: "High Demand",
  },
  {
    id: "PDI-002",
    name: "Aerospace Engine Blocks",
    category: "Automotive",
    description:
      "Precision-machined titanium alloy engine cores. MIL-SPEC compliant.",
    pricePerUnit: "$120,000",
    unit: "per unit",
    badge: "Premium",
  },
  {
    id: "PDI-003",
    name: "Advanced Fiber Optics",
    category: "Infrastructure",
    description:
      "Ultra-low latency fiber optic cable rated for industrial deployment.",
    pricePerUnit: "$8,500",
    unit: "per km",
    badge: "In Stock",
  },
  {
    id: "PDI-004",
    name: "Quantum Memory Arrays",
    category: "Computing",
    description:
      "High-density RAM modules optimized for AI workloads.",
    pricePerUnit: "$25,000",
    unit: "per array",
    badge: "Limited",
  },
];

export default function StorePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("");
  const [placing, setPlacing] = useState(false);
  const [orderPin, setOrderPin] = useState<number | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/login");
      } else {
        setUser(u);
        setAuthLoading(false);
      }
    });
    return () => unsub();
  }, [router]);

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/login");
  }

  const selectedProduct = CATALOG.find(
    (p) => p.id === selectedProductId
  );

  const numericPrice = selectedProduct
    ? parseFloat(selectedProduct.pricePerUnit.replace(/[$,]/g, ""))
    : 0;

  const totalPrice = numericPrice * quantity;

  async function handleSubmit() {
    if (!user) {
      toast.error("You must be signed in.");
      return;
    }

    if (!selectedProduct) {
      toast.error("Please select a product.");
      return;
    }

    if (!location.trim()) {
      toast.error("Location required.");
      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    setPlacing(true);

    try {
      const generatedPin = Math.floor(1000 + Math.random() * 9000);

      await addDoc(collection(db, "orders"), {
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        quantity,
        unitPrice: numericPrice,
        totalPrice,
        location,
        pin: generatedPin,
        userEmail: user.email,
        userId: user.uid,
        timestamp: Timestamp.now(),
        status: "PENDING",
      });

      setOrderPin(generatedPin);
      setQuantity(1);
      setLocation("");
    } catch {
      toast.error("Failed to place order.");
    } finally {
      setPlacing(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#081021] flex items-center justify-center">
        <Loader2 className="size-8 text-[#00C9B1] animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#081021] text-slate-900 dark:text-white">
      {/* Ambient grid */}
      <div
        className="fixed inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,201,177,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,177,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#00C9B1]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#FF8C00]/4 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-[#081021]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="size-6 text-[#FF8C00]" />
            <span
              className="text-lg font-black tracking-[0.2em] text-slate-900 dark:text-white"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              LOGISTRIA
            </span>
            <span className="hidden sm:block text-white/20 mx-2">|</span>
            <span className="hidden sm:block text-slate-500 dark:text-slate-400 text-xs tracking-[0.2em] uppercase font-semibold">
              B2B Procurement
            </span>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-slate-400 dark:text-slate-500 text-sm hidden md:block truncate max-w-[200px]">
                {user.email}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline ml-1">Sign Out</span>
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-[1000px] mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#00C9B1] text-xs font-bold tracking-[0.4em] uppercase mb-4"
          >
            ◈ Enterprise-Grade Supply Chain
          </motion.p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
            Logistria{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #FF8C00, #FFB84D)",
              }}
            >
              B2B Procurement
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Source mission-critical components directly from the global supply
            chain. Instant order routing. Guaranteed traceability.
          </p>
        </motion.div>

        {/* Single Full-Width Form Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-12 space-y-10 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Create Supply Order
            </h2>
            {selectedProduct && (
              <Badge className="bg-[#FF8C00]/10 text-[#FF8C00] border border-[#FF8C00]/30 text-sm px-4 py-2">
                {selectedProduct.badge}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-4 text-lg"
            >
              <option value="">Select Product</option>
              {CATALOG.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            <Input
              value={selectedProduct?.id || ""}
              disabled
              className="bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-lg"
              placeholder="Product ID"
            />

            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-lg"
              placeholder="Quantity"
            />

            <Input
              value={selectedProduct ? `$${numericPrice.toLocaleString()}` : ""}
              disabled
              className="bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-lg"
              placeholder="Unit Price"
            />

            <Input
              value={selectedProduct ? `$${totalPrice.toLocaleString()}` : ""}
              disabled
              className="bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-lg md:col-span-2"
              placeholder="Total Price"
            />

            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-lg md:col-span-2"
              placeholder="Delivery Location"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={placing}
            className="w-full h-14 bg-[#00C9B1] hover:bg-[#00C9B1]/90 text-black font-bold text-lg shadow-lg shadow-[#00C9B1]/20 hover:shadow-[#00C9B1]/40 transition-all duration-200"
          >
            {placing ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              "Submit Order"
            )}
          </Button>

          {orderPin && (
            <div className="text-center bg-green-900/40 border border-green-500/30 rounded-2xl py-6">
              <p className="text-sm text-green-400">
                Verification PIN
              </p>
              <p className="text-3xl font-bold text-green-300">
                {orderPin}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}