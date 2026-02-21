"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Box,
  Truck,
  TrendingUp,
  Zap,
  ArrowRight,
  ChevronRight,
  Globe,
  Shield,
  Activity,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Animation helpers
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

function useScrollReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const CLIENTS = [
  "MAERSK GLOBAL",
  "DHL LOGISTICS",
  "CARGILL INC.",
  "SIEMENS AG",
  "TOYOTA TSUSHO",
];

const FEATURES = [
  {
    icon: Box,
    accentColor: "#FF8C00",
    tag: "Supplier Agent",
    title: "Predictive Restocking",
    description:
      "Autonomous agents monitor supplier health scores, lead times, and geopolitical risk — and pre-order inventory before stockouts ever occur.",
    stat: "99.4%",
    statLabel: "Stockout prevention rate",
  },
  {
    icon: Truck,
    accentColor: "#00C9B1",
    tag: "Logistics Agent",
    title: "Dynamic Rerouting",
    description:
      "When a port closes or weather hits, our AI negotiates alternate carriers and reroutes shipments within seconds — not hours.",
    stat: "4.2s",
    statLabel: "Average reroute decision time",
  },
  {
    icon: TrendingUp,
    accentColor: "#FF8C00",
    tag: "Sales Agent",
    title: "Demand Forecasting",
    description:
      "Cross-correlate 400+ market signals to predict demand surges weeks in advance and automatically adjust procurement volumes.",
    stat: "31%",
    statLabel: "Average revenue uplift",
  },
];

const STATS = [
  { value: "$2.4T", label: "Supply Chain Value Monitored" },
  { value: "187", label: "Countries Covered" },
  { value: "99.97%", label: "Platform Uptime" },
  { value: "12ms", label: "Global Decision Latency" },
];

/* ─────────────────────────────────────────────
   Components
───────────────────────────────────────────── */

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#081021]/80 backdrop-blur-xl border-b border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            className="text-xl font-black tracking-[0.28em] text-white group-hover:text-white/90 transition-colors"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            LOGISTRIA
          </span>
          <span className="size-2 rounded-full bg-[#00C9B1] shadow-lg shadow-[#00C9B1]/60 animate-pulse" />
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {["Platform", "Solutions", "Pricing", "About"].map((item) => (
            <button
              key={item}
              className="hover:text-white transition-colors tracking-wide"
            >
              {item}
            </button>
          ))}
        </div>

        {/* CTA */}
        <Link href="/login">
          <Button className="bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold tracking-wider text-sm h-9 px-5 shadow-lg shadow-[#FF8C00]/25 hover:shadow-[#FF8C00]/50 transition-all duration-200 hover:scale-[1.02]">
            Access Control Tower
            <ChevronRight className="size-4" />
          </Button>
        </Link>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Radial glow — globe effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,140,0,0.07) 0%, rgba(0,201,177,0.05) 40%, transparent 70%)",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,140,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.4) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {/* Corner flares */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#FF8C00]/4 blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#00C9B1]/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-[#00C9B1]/30 bg-[#00C9B1]/5 px-4 py-1.5 mb-8"
        >
          <Activity className="size-3.5 text-[#00C9B1]" />
          <span className="text-[#00C9B1] text-xs font-semibold tracking-[0.2em] uppercase">
            Now in Open Beta · Multi-Agent AI Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6"
        >
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #FF8C00 0%, #FFB84D 35%, #00C9B1 100%)",
            }}
          >
            Supply Chains That
            <br />
            Think For Themselves.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Logistria uses autonomous{" "}
          <span className="text-white font-semibold">Multi-Agent AI</span> to
          detect disruptions, negotiate with suppliers, and reroute shipments in{" "}
          <span className="text-[#00C9B1] font-semibold">real-time</span> —
          without a single human touchpoint.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.45}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/store">
            <Button className="h-12 px-8 bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold text-base tracking-wide shadow-2xl shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50 transition-all duration-200 hover:scale-[1.03]">
              Request Demo
              <ArrowRight className="size-4 ml-1" />
            </Button>
          </Link>
          <Button
            variant="outline"
            className="h-12 px-8 bg-slate-900/50 backdrop-blur-md border-white/15 text-white hover:bg-white/10 hover:border-white/30 font-semibold text-base transition-all duration-200"
          >
            <Globe className="size-4 mr-2 text-[#00C9B1]" />
            Explore Technology
          </Button>
        </motion.div>

        {/* Floating metric pills */}
        <motion.div
          custom={0.6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-3 mt-14"
        >
          {[
            { icon: Shield, text: "SOC 2 Type II", color: "#00C9B1" },
            { icon: Zap, text: "12ms Global Latency", color: "#FF8C00" },
            { icon: Activity, text: "99.97% Uptime SLA", color: "#00C9B1" },
          ].map(({ icon: Icon, text, color }) => (
            <div
              key={text}
              className="flex items-center gap-2 rounded-full bg-slate-900/60 backdrop-blur border border-white/10 px-4 py-2"
            >
              <Icon className="size-3.5" style={{ color }} />
              <span className="text-slate-300 text-xs font-medium">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TrustBanner() {
  const { ref, inView } = useScrollReveal();
  return (
    <section ref={ref} className="border-y border-white/[0.06] bg-slate-900/30 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          custom={0}
          className="text-center text-slate-500 text-xs font-semibold tracking-[0.35em] uppercase mb-6"
        >
          Trusted by Global Logistics Leaders
        </motion.p>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          custom={0.15}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {CLIENTS.map((name) => (
            <span
              key={name}
              className="text-slate-500 text-sm font-bold tracking-[0.2em] uppercase hover:text-slate-300 transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatsBar() {
  const { ref, inView } = useScrollReveal();
  return (
    <section ref={ref} className="py-16 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i * 0.1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-colors"
          >
            <p
              className="text-3xl font-black mb-1"
              style={{
                color: i % 2 === 0 ? "#FF8C00" : "#00C9B1",
              }}
            >
              {s.value}
            </p>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { ref, inView } = useScrollReveal();
  return (
    <section ref={ref} className="py-20 max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        custom={0}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeUp}
        className="text-center mb-14"
      >
        <p className="text-[#FF8C00] text-xs font-bold tracking-[0.35em] uppercase mb-4">
          ◈ Autonomous Workforce
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
          Meet Your New{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)",
            }}
          >
            Autonomous Workforce.
          </span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
          Specialized AI agents work 24/7 in parallel — each an expert in its
          domain, collaborating in real-time across the full supply chain graph.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.tag}
              custom={0.15 + i * 0.12}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="group relative bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-7 flex flex-col gap-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-default"
              style={{
                boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
              }}
            >
              {/* Top glow line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${f.accentColor}80, transparent)`,
                }}
              />
              {/* Background glow */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: `${f.accentColor}0A` }}
              />

              {/* Icon + Tag */}
              <div className="flex items-start justify-between">
                <div
                  className="p-3 rounded-xl border transition-colors duration-300"
                  style={{
                    backgroundColor: `${f.accentColor}12`,
                    borderColor: `${f.accentColor}30`,
                  }}
                >
                  <Icon className="size-6" style={{ color: f.accentColor }} />
                </div>
                <span
                  className="text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border"
                  style={{
                    color: f.accentColor,
                    backgroundColor: `${f.accentColor}12`,
                    borderColor: `${f.accentColor}30`,
                  }}
                >
                  {f.tag}
                </span>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/95 transition-colors">
                  {f.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </div>

              {/* Stat */}
              <div
                className="border-t pt-5 flex items-end gap-3"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <span
                  className="text-3xl font-black leading-none"
                  style={{ color: f.accentColor }}
                >
                  {f.stat}
                </span>
                <span className="text-slate-500 text-xs pb-0.5 leading-tight">
                  {f.statLabel}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function CtaBanner() {
  const { ref, inView } = useScrollReveal();
  return (
    <section ref={ref} className="py-12 max-w-7xl mx-auto px-6">
      <motion.div
        custom={0}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeUp}
        className="relative rounded-3xl border border-[#FF8C00]/20 overflow-hidden p-10 md:p-16 text-center"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,140,0,0.06) 0%, rgba(8,16,33,0.9) 70%)",
          boxShadow: "0 0 80px rgba(255,140,0,0.06)",
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,140,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <p className="text-[#FF8C00] text-xs font-bold tracking-[0.35em] uppercase mb-5 relative">
          ◈ Get Early Access
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight relative">
          The Future of Logistics
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}
          >
            Is Autonomous.
          </span>
        </h2>
        <p className="text-slate-400 mb-10 max-w-lg mx-auto text-base relative">
          Join 2,000+ supply chain executives on the waitlist. Be first to
          deploy autonomous AI agents across your network.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto relative">
          <Link href="/login" className="w-full sm:w-auto">
            <Button className="w-full h-12 px-8 bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold text-sm tracking-wider shadow-xl shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50 transition-all duration-200 hover:scale-[1.02]">
              Access Control Tower
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="border-t border-teal-500/20 bg-[#060e1c] mt-8">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="text-2xl font-black tracking-[0.28em] text-white"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                LOGISTRIA
              </span>
              <span className="size-2 rounded-full bg-[#00C9B1] shadow-lg shadow-[#00C9B1]/50" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Autonomous supply chain intelligence. From prediction to execution
              — without human latency.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { heading: "Platform", links: ["Control Tower", "AI Agents", "Analytics", "Integrations"] },
              { heading: "Company", links: ["About", "Blog", "Careers", "Security"] },
            ].map((col) => (
              <div key={col.heading}>
                <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">
                  {col.heading}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <button className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
                        {l}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Waitlist */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-2">
              Join the Waitlist
            </p>
            <p className="text-slate-500 text-sm mb-4">
              Get early access and exclusive launch pricing.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-[#00C9B1] text-sm font-semibold">
                <Zap className="size-4" />
                You're on the list!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/40 border-white/10 text-white placeholder:text-slate-600 focus:border-[#00C9B1] h-10 text-sm flex-1"
                />
                <Button
                  type="submit"
                  className="h-10 px-4 bg-[#00C9B1] hover:bg-[#00C9B1]/90 text-black font-bold text-xs tracking-wider shrink-0 shadow-lg shadow-[#00C9B1]/20"
                >
                  Join
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 text-xs">
          <p>© 2025 Logistria Technologies, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <button key={l} className="hover:text-slate-400 transition-colors">
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#081021] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustBanner />
      <StatsBar />
      <FeaturesSection />
      <CtaBanner />
      <Footer />
    </div>
  );
}

