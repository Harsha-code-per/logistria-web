"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Zap, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "register") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", cred.user.uid), {
          email: cred.user.email,
          role: "Client",
          createdAt: new Date(),
        });
        toast.success("Account created! Redirecting…");
        router.push("/store");
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const snap = await getDoc(doc(db, "users", cred.user.uid));
        const role = snap.data()?.role ?? "Client";
        if (role === "Chief Logistics Officer" || role === "Logistics Officer") {
          router.push("/admin");
        } else {
          router.push("/store");
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      toast.error(message.replace("Firebase: ", "").replace(/ \(auth\/.*\)\.?/, ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#081021] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF8C00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00C9B1]/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Zap className="size-8 text-[#FF8C00]" />
            <h1
              className="text-4xl font-black tracking-[0.25em] text-white"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              LOGISTRIA
            </h1>
          </div>
          <p className="text-[#00C9B1] text-xs tracking-[0.3em] uppercase font-semibold">
            Supply Chain Control Tower
          </p>
        </motion.div>

        {/* Card */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50">
          {/* Mode toggle */}
          <div className="flex rounded-lg bg-black/30 p-1 mb-8 border border-white/5">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
                  mode === m
                    ? "bg-[#FF8C00] text-black shadow-lg shadow-[#FF8C00]/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {m === "login" ? "Sign In" : "Register Client"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs tracking-widest uppercase">
                  Corporate Email
                </Label>
                <Input
                  type="email"
                  placeholder="officer@logistics.corp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/40 border-white/10 text-white placeholder:text-slate-500 focus:border-[#FF8C00] focus:ring-[#FF8C00]/20 h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 text-xs tracking-widest uppercase">
                  Access Key
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black/40 border-white/10 text-white placeholder:text-slate-500 focus:border-[#FF8C00] focus:ring-[#FF8C00]/20 h-11"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold tracking-widest uppercase text-sm shadow-lg shadow-[#FF8C00]/30 transition-all duration-200 hover:shadow-[#FF8C00]/50 hover:scale-[1.01]"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="size-4" />
                    {mode === "login" ? "Authenticate" : "Create Account"}
                  </>
                )}
              </Button>
            </motion.form>
          </AnimatePresence>

          <p className="text-center text-slate-500 text-xs mt-6">
            {mode === "login" ? (
              <>
                New corporate client?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="text-[#00C9B1] hover:text-[#00C9B1]/80 font-semibold"
                >
                  Register here
                </button>
              </>
            ) : (
              <>
                Already have access?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-[#00C9B1] hover:text-[#00C9B1]/80 font-semibold"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6 tracking-widest">
          ENCRYPTED · SECURE · ENTERPRISE-GRADE
        </p>
      </motion.div>
    </main>
  );
}
