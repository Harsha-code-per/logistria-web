"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Globe,
  Activity,
  Shield,
  Cpu,
  Network,
  BarChart3,
  RefreshCw,
  Layers,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const, delay: d } }),
};

function useReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return { ref, inView };
}

const CAPABILITIES = [
  {
    icon: Activity,
    color: "#00C9B1",
    title: "Real-Time Visibility",
    desc: "Sub-second tracking across every node in your network. Know exactly where every shipment, truck, and asset is — at all times.",
    metric: "< 50ms", metricLabel: "data propagation latency",
  },
  {
    icon: Cpu,
    color: "#FF8C00",
    title: "AI Orchestration Engine",
    desc: "Specialized autonomous agents collaborate continuously — supplier, logistics, demand, and risk agents operating in concert 24/7.",
    metric: "50+", metricLabel: "concurrent agent threads",
  },
  {
    icon: BarChart3,
    color: "#00C9B1",
    title: "Predictive Analytics",
    desc: "Cross-correlate 400+ market signals to forecast demand, supplier failures, and port congestion weeks before they happen.",
    metric: "94%", metricLabel: "forecast accuracy",
  },
  {
    icon: Network,
    color: "#FF8C00",
    title: "Multi-Carrier Integration",
    desc: "Connect to 200+ carriers, freight brokers, and 3PLs. One API. Zero manual coordination.",
    metric: "200+", metricLabel: "carrier integrations",
  },
  {
    icon: AlertTriangle,
    color: "#00C9B1",
    title: "Risk Intelligence",
    desc: "Monitor geopolitical events, weather, financial health of suppliers, and port closures. Alerts before they become crises.",
    metric: "6hrs", metricLabel: "average early warning",
  },
  {
    icon: RefreshCw,
    color: "#FF8C00",
    title: "Autonomous Execution",
    desc: "From detected disruption to re-negotiated contract and rerouted shipment — end-to-end without human latency.",
    metric: "4.2s", metricLabel: "average decision time",
  },
];

const INTEGRATIONS = [
  "SAP S/4HANA", "Oracle SCM", "Salesforce", "Microsoft Dynamics",
  "Shopify Plus", "NetSuite", "Snowflake", "AWS Supply Chain",
];

const ARCH_STEPS = [
  { num: "01", title: "Ingest", desc: "Real-time data streams from ERP, IoT sensors, carriers, and market feeds flow into the unified data fabric." },
  { num: "02", title: "Reason", desc: "The multi-agent AI layer runs continuous inference — each agent specialized in its domain, sharing a live world model." },
  { num: "03", title: "Act", desc: "Approved actions — re-orders, reroutes, contract amendments — execute automatically via native integrations." },
  { num: "04", title: "Learn", desc: "Every decision feeds back into the model. The system gets smarter with every disruption it handles." },
];

export default function PlatformPage() {
  const hero = useReveal();
  const caps = useReveal();
  const arch = useReveal();
  const integrations = useReveal();

  return (
    <div className="min-h-screen bg-[#081021] text-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,201,177,0.08) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(0,201,177,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,177,0.5) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />

        <div ref={hero.ref} className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div custom={0} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#00C9B1]/30 bg-[#00C9B1]/5 px-4 py-1.5 mb-7">
            <Zap className="size-3.5 text-[#00C9B1]" />
            <span className="text-[#00C9B1] text-xs font-semibold tracking-[0.2em] uppercase">The Logistria Platform</span>
          </motion.div>

          <motion.h1 custom={0.1} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.06] tracking-tight mb-6">
            One Platform.{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}>
              Every Supply Chain Decision.
            </span>
          </motion.h1>

          <motion.p custom={0.2} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            The Logistria Platform is the operating system for modern supply chains — unifying real-time data, autonomous AI agents, and execution across your entire network.
          </motion.p>

          <motion.div custom={0.3} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/login">
              <Button className="h-12 px-8 bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold tracking-wide shadow-xl shadow-[#FF8C00]/25 hover:scale-[1.02] transition-all">
                Start Free Trial <ArrowRight className="size-4 ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" className="h-12 px-8 bg-slate-900/50 border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all">
                View Pricing
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Capabilities Grid ── */}
      <section ref={caps.ref} className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div custom={0} initial="hidden" animate={caps.inView ? "visible" : "hidden"} variants={fadeUp} className="text-center mb-14">
          <p className="text-[#00C9B1] text-xs font-bold tracking-[0.35em] uppercase mb-4">◈ Core Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Built for{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}>
              Enterprise Scale
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            Six pillars that work as one — delivering end-to-end supply chain intelligence at the speed of AI.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={c.title} custom={0.08 * i} initial="hidden" animate={caps.inView ? "visible" : "hidden"} variants={fadeUp}
                className="group bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${c.color}15`, border: `1px solid ${c.color}30` }}>
                    <Icon className="size-5" style={{ color: c.color }} />
                  </div>
                  <h3 className="font-bold text-white text-sm">{c.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{c.desc}</p>
                <div className="border-t border-white/[0.06] pt-4 flex items-end gap-2">
                  <span className="text-2xl font-black" style={{ color: c.color }}>{c.metric}</span>
                  <span className="text-slate-500 text-xs pb-0.5">{c.metricLabel}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Architecture ── */}
      <section ref={arch.ref} className="py-20 border-y border-white/[0.06] bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div custom={0} initial="hidden" animate={arch.inView ? "visible" : "hidden"} variants={fadeUp} className="text-center mb-14">
            <p className="text-[#FF8C00] text-xs font-bold tracking-[0.35em] uppercase mb-4">◈ How It Works</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              From Raw Signal to{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}>
                Autonomous Action
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line on lg */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#FF8C00]/20 via-[#00C9B1]/40 to-[#FF8C00]/20" />

            {ARCH_STEPS.map((s, i) => (
              <motion.div key={s.num} custom={0.1 * i} initial="hidden" animate={arch.inView ? "visible" : "hidden"} variants={fadeUp}
                className="relative bg-slate-900/50 border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-black"
                  style={{ background: i % 2 === 0 ? "rgba(255,140,0,0.15)" : "rgba(0,201,177,0.15)", color: i % 2 === 0 ? "#FF8C00" : "#00C9B1", border: `1px solid ${i % 2 === 0 ? "#FF8C00" : "#00C9B1"}30` }}>
                  {s.num}
                </div>
                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section ref={integrations.ref} className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div custom={0} initial="hidden" animate={integrations.inView ? "visible" : "hidden"} variants={fadeUp} className="text-center mb-12">
          <p className="text-[#00C9B1] text-xs font-bold tracking-[0.35em] uppercase mb-4">◈ Integrations</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Connects to Your{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}>
              Existing Stack
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">Pre-built connectors for the tools your team already uses. Go live in days, not months.</p>
        </motion.div>

        <motion.div custom={0.15} initial="hidden" animate={integrations.inView ? "visible" : "hidden"} variants={fadeUp}
          className="flex flex-wrap justify-center gap-3">
          {INTEGRATIONS.map((name) => (
            <div key={name} className="flex items-center gap-2 bg-slate-900/60 border border-white/10 rounded-xl px-5 py-3 hover:border-[#00C9B1]/30 transition-colors">
              <CheckCircle2 className="size-3.5 text-[#00C9B1]" />
              <span className="text-slate-300 text-sm font-medium">{name}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 bg-slate-900/30 border border-dashed border-white/10 rounded-xl px-5 py-3">
            <Layers className="size-3.5 text-slate-500" />
            <span className="text-slate-500 text-sm">+ 190 more via API</span>
          </div>
        </motion.div>

        {/* Security badges */}
        <motion.div custom={0.25} initial="hidden" animate={integrations.inView ? "visible" : "hidden"} variants={fadeUp}
          className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            { icon: Shield, label: "SOC 2 Type II" },
            { icon: Globe, label: "ISO 27001" },
            { icon: CheckCircle2, label: "GDPR Compliant" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-[#00C9B1]/5 border border-[#00C9B1]/20 rounded-full px-4 py-2">
              <Icon className="size-3.5 text-[#00C9B1]" />
              <span className="text-[#00C9B1] text-xs font-semibold">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative rounded-3xl border border-[#FF8C00]/20 overflow-hidden p-10 md:p-16 text-center"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,140,0,0.06) 0%, rgba(8,16,33,0.9) 70%)", boxShadow: "0 0 80px rgba(255,140,0,0.06)" }}>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(255,140,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 relative">Ready to Deploy?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto relative">Start a free 30-day trial. No credit card required. Full platform access from day one.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
            <Link href="/login">
              <Button className="h-12 px-8 bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold tracking-wider shadow-xl shadow-[#FF8C00]/30 hover:scale-[1.02] transition-all">
                Start Free Trial <ArrowRight className="size-4 ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" className="h-12 px-8 bg-slate-900/50 border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all">
                Compare Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
