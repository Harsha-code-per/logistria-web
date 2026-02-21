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
  Package,
  Truck,
  ShoppingCart,
  Flame,
  CheckCircle2,
  TrendingUp,
  Clock,
  DollarSign,
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

const INDUSTRIES = [
  {
    icon: Package,
    color: "#FF8C00",
    title: "Aerospace & Defence",
    tag: "MIL-SPEC Compliant",
    overview: "Manage ultra-complex, high-stakes supply chains with zero-tolerance for delay. Logistria monitors tier-1 through tier-4 suppliers and flags risk months ahead.",
    benefits: [
      "Real-time supplier health monitoring across 4 supplier tiers",
      "Automatic alternate sourcing when primary supplier scores drop",
      "Export control & ITAR compliance automation",
      "BOE (Basis of Estimate) demand modelling",
    ],
    metric: "43%", metricLabel: "reduction in component shortages",
  },
  {
    icon: Truck,
    color: "#00C9B1",
    title: "Automotive & EV",
    tag: "Just-In-Time Ready",
    overview: "Support JIT assembly lines with sub-minute supply visibility. Our agents autonomously manage Kanban replenishment, inbound logistics, and semiconductor allocation.",
    benefits: [
      "JIT/JIS replenishment triggered by live assembly-line consumption",
      "Semiconductor allocation optimisation across plants",
      "Dynamic milk-run routing for inbound logistics",
      "Battery supply chain traceability (EU Battery Regulation ready)",
    ],
    metric: "99.4%", metricLabel: "line-stop prevention rate",
  },
  {
    icon: ShoppingCart,
    color: "#FF8C00",
    title: "Retail & FMCG",
    tag: "Omnichannel Native",
    overview: "From DC to last-mile, Logistria unifies your inventory visibility and demand signal across every channel — stores, e-commerce, and dark stores.",
    benefits: [
      "Unified inventory view across stores, DCs, and e-commerce",
      "AI-driven seasonal demand forecasting (400+ signals)",
      "Automatic markdown prevention via timely rebalancing",
      "Last-mile carrier selection and SLA management",
    ],
    metric: "31%", metricLabel: "average revenue uplift",
  },
  {
    icon: Flame,
    color: "#00C9B1",
    title: "Energy & Utilities",
    tag: "Critical Infrastructure",
    overview: "Manage the unique demands of energy-sector supply chains — from critical spare-parts management to contractor logistics for field operations.",
    benefits: [
      "Critical spare-parts inventory with predictive restocking",
      "Contractor and field-crew logistics coordination",
      "Regulatory compliance documentation automation",
      "Multi-site, multi-asset real-time visibility",
    ],
    metric: "68%", metricLabel: "reduction in unplanned downtime",
  },
];

const HOW_IT_WORKS = [
  { icon: Zap, title: "Connect in Days", desc: "Native connectors for SAP, Oracle, and 200+ ERPs. Your data is live in the platform within 72 hours." },
  { icon: TrendingUp, title: "AI Goes to Work", desc: "The multi-agent layer immediately begins learning your network, flagging risks, and surfacing optimisation opportunities." },
  { icon: Clock, title: "Automate & Measure", desc: "Approve automation policies once. Logistria executes continuously — and you track every outcome in real-time." },
];

export default function SolutionsPage() {
  const hero = useReveal();
  const industries = useReveal();
  const how = useReveal();
  const outcomes = useReveal();

  return (
    <div className="min-h-screen bg-[#081021] text-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,140,0,0.07) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,140,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.4) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />

        <div ref={hero.ref} className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div custom={0} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#FF8C00]/30 bg-[#FF8C00]/5 px-4 py-1.5 mb-7">
            <Zap className="size-3.5 text-[#FF8C00]" />
            <span className="text-[#FF8C00] text-xs font-semibold tracking-[0.2em] uppercase">Industry Solutions</span>
          </motion.div>

          <motion.h1 custom={0.1} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.06] tracking-tight mb-6">
            Built for{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}>
              Your Industry.
            </span>
          </motion.h1>

          <motion.p custom={0.2} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Logistria&apos;s AI agents are pre-trained on the specific challenges, regulations, and metrics that define each industry. Not a generic platform — a specialist in yours.
          </motion.p>

          <motion.div custom={0.3} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/login">
              <Button className="h-12 px-8 bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold tracking-wide shadow-xl shadow-[#FF8C00]/25 hover:scale-[1.02] transition-all">
                Request Industry Demo <ArrowRight className="size-4 ml-1" />
              </Button>
            </Link>
            <Link href="/platform">
              <Button variant="outline" className="h-12 px-8 bg-slate-900/50 border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all">
                Explore Platform
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Industry Cards ── */}
      <section ref={industries.ref} className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            const isRight = i % 2 === 1;
            return (
              <motion.div key={ind.title} custom={0.08 * i} initial="hidden" animate={industries.inView ? "visible" : "hidden"} variants={fadeUp}
                className="group bg-slate-900/50 border border-white/10 rounded-2xl p-7 sm:p-10 hover:border-white/20 transition-all duration-300 overflow-hidden relative">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  style={{ background: `radial-gradient(ellipse 50% 60% at ${isRight ? "80%" : "20%"} 50%, ${ind.color}08 0%, transparent 70%)` }} />

                <div className="relative grid md:grid-cols-2 gap-8 items-start">
                  {/* Left */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${ind.color}15`, border: `1px solid ${ind.color}30` }}>
                        <Icon className="size-5" style={{ color: ind.color }} />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                        style={{ color: ind.color, backgroundColor: `${ind.color}12`, border: `1px solid ${ind.color}30` }}>
                        {ind.tag}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">{ind.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-6">{ind.overview}</p>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-black" style={{ color: ind.color }}>{ind.metric}</span>
                      <span className="text-slate-500 text-sm pb-1">{ind.metricLabel}</span>
                    </div>
                  </div>

                  {/* Right — benefit list */}
                  <div className="space-y-3">
                    {ind.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-3 bg-black/20 rounded-xl p-3.5 border border-white/5">
                        <CheckCircle2 className="size-4 mt-0.5 shrink-0" style={{ color: ind.color }} />
                        <span className="text-slate-300 text-sm leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section ref={how.ref} className="py-20 border-t border-white/[0.06] bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div custom={0} initial="hidden" animate={how.inView ? "visible" : "hidden"} variants={fadeUp} className="text-center mb-12">
            <p className="text-[#00C9B1] text-xs font-bold tracking-[0.35em] uppercase mb-4">◈ Getting Started</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Live in{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}>
                72 Hours
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} custom={0.1 * i} initial="hidden" animate={how.inView ? "visible" : "hidden"} variants={fadeUp}
                  className="bg-slate-900/50 border border-white/10 rounded-2xl p-7 text-center hover:border-white/20 transition-colors">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: i % 2 === 0 ? "rgba(255,140,0,0.12)" : "rgba(0,201,177,0.12)", border: `1px solid ${i % 2 === 0 ? "#FF8C00" : "#00C9B1"}30` }}>
                    <Icon className="size-5" style={{ color: i % 2 === 0 ? "#FF8C00" : "#00C9B1" }} />
                  </div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: i % 2 === 0 ? "#FF8C00" : "#00C9B1" }}>Step {i + 1}</p>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Outcomes bar ── */}
      <section ref={outcomes.ref} className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: TrendingUp, value: "31%", label: "Avg. revenue uplift", color: "#FF8C00" },
            { icon: Clock, value: "4.2s", label: "Decision time", color: "#00C9B1" },
            { icon: DollarSign, value: "18%", label: "Logistics cost reduction", color: "#FF8C00" },
            { icon: CheckCircle2, value: "99.4%", label: "Disruption prevention", color: "#00C9B1" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} custom={0.08 * i} initial="hidden" animate={outcomes.inView ? "visible" : "hidden"} variants={fadeUp}
                className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-colors">
                <Icon className="size-5 mx-auto mb-3" style={{ color: s.color }} />
                <p className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-slate-400 text-xs uppercase tracking-widest">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl border border-[#FF8C00]/20 overflow-hidden p-10 md:p-14 text-center"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,140,0,0.06) 0%, rgba(8,16,33,0.9) 70%)", boxShadow: "0 0 80px rgba(255,140,0,0.06)" }}>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Find Your Industry Solution</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">Book a personalised demo tailored to your industry&apos;s specific supply chain challenges.</p>
          <Link href="/login">
            <Button className="h-12 px-8 bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold tracking-wider shadow-xl shadow-[#FF8C00]/30 hover:scale-[1.02] transition-all">
              Request Industry Demo <ArrowRight className="size-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
