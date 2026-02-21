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
  ShoppingCart,
  Package,
  CheckCircle,
  Star,
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
  icon: React.ElementType;
}

const CATALOG: Product[] = [
  {
    id: "semiconductors",
    name: "Industrial Semiconductors",
    category: "Electronics",
    description:
      "High-performance chips engineered for aerospace, defense, and advanced manufacturing pipelines. Lot-certified.",
    pricePerUnit: "$45,000",
    unit: "per lot",
    badge: "High Demand",
    icon: Zap,
  },
  {
    id: "engine-blocks",
    name: "Aerospace Engine Blocks",
    category: "Automotive",
    description:
      "Precision-machined titanium alloy engine cores. MIL-SPEC compliant. Ships with full certification package.",
    pricePerUnit: "$120,000",
    unit: "per unit",
    badge: "Premium",
    icon: Star,
  },
  {
    id: "fiber-optics",
    name: "Advanced Fiber Optics",
    category: "Infrastructure",
    description:
      "Ultra-low latency single-mode fiber optic cable. Rated for subsea and industrial deployment environments.",
    pricePerUnit: "$8,500",
    unit: "per km",
    badge: "In Stock",
    icon: Package,
  },
  {
    id: "quantum-memory",
    name: "Quantum Memory Arrays",
    category: "Computing",
    description:
      "Next-generation high-density RAM modules optimized for parallel computation and AI inference workloads.",
    pricePerUnit: "$25,000",
    unit: "per array",
    badge: "Limited",
    icon: CheckCircle,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function ProductCard({
  product,
  user,
}: {
  product: Product;
  user: User | null;
}) {
  const [quantity, setQuantity] = useState(1);
  const [placing, setPlacing] = useState(false);

  async function handlePlaceOrder() {
    if (!user) {
      toast.error("You must be signed in to place an order.");
      return;
    }
    if (quantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }
    setPlacing(true);
    try {
      await addDoc(collection(db, "orders"), {
        productName: product.name,
        quantity: Number(quantity),
        userEmail: user.email,
        userId: user.uid,
        timestamp: Timestamp.now(),
        status: "PENDING",
      });
      toast.success(`Order placed for ${product.name}!`, {
        description: `Qty: ${quantity} ${product.unit} · Status: PENDING`,
      });
      setQuantity(1);
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  }

  const Icon = product.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="relative group bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-5 overflow-hidden"
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: "inset 0 0 60px rgba(0,201,177,0.06)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,201,177,0.5), transparent)" }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="p-2.5 rounded-xl bg-[#00C9B1]/10 border border-[#00C9B1]/20 group-hover:bg-[#00C9B1]/15 transition-colors">
          <Icon className="size-5 text-[#00C9B1]" />
        </div>
        <Badge className="bg-[#FF8C00]/10 text-[#FF8C00] border border-[#FF8C00]/30 text-xs font-semibold shrink-0">
          {product.badge}
        </Badge>
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-1 font-semibold">
          {product.category}
        </p>
        <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-[#00C9B1] transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">{product.description}</p>
      </div>

      {/* Price */}
      <div className="border-t border-white/10 pt-4">
        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="text-2xl font-black text-[#FF8C00]">{product.pricePerUnit}</span>
          <span className="text-slate-500 text-sm">{product.unit}</span>
        </div>

        {/* Order controls */}
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 h-10 bg-black/40 border-white/10 text-white text-center font-mono focus:border-[#00C9B1] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            onClick={handlePlaceOrder}
            disabled={placing}
            className="flex-1 h-10 bg-[#00C9B1] hover:bg-[#00C9B1]/90 text-black font-bold tracking-wider text-sm shadow-lg shadow-[#00C9B1]/20 hover:shadow-[#00C9B1]/40 transition-all duration-200"
          >
            {placing ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="size-4" />
                Place Order
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function StorePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#081021] flex items-center justify-center">
        <Loader2 className="size-8 text-[#00C9B1] animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#081021] text-white">
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
        className="sticky top-0 z-50 bg-[#081021]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="size-6 text-[#FF8C00]" />
            <span
              className="text-lg font-black tracking-[0.2em] text-white"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              LOGISTRIA
            </span>
            <span className="hidden sm:block text-white/20 mx-2">|</span>
            <span className="hidden sm:block text-slate-400 text-xs tracking-[0.2em] uppercase font-semibold">
              B2B Procurement
            </span>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-slate-500 text-sm hidden md:block truncate max-w-[200px]">
                {user.email}
              </span>
            )}
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

      <div className="max-w-7xl mx-auto px-6 py-12">
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Logistria{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #FF8C00, #FFB84D)",
              }}
            >
              B2B Procurement
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Source mission-critical components directly from the global supply
            chain. Instant order routing. Guaranteed traceability.
          </p>
        </motion.div>

        {/* Catalog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CATALOG.map((product) => (
            <ProductCard key={product.id} product={product} user={user} />
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-slate-600 text-xs mt-12 tracking-widest"
        >
          ALL TRANSACTIONS ENCRYPTED · ISO 28000 COMPLIANT · LOGISTRIA © 2025
        </motion.p>
      </div>
    </main>
  );
}
