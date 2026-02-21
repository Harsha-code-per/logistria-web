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
  Shield,
  Cpu,
  TrendingUp,
  Users,
  Target,
  Heart,
  Lightbulb,
  Lock,
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

const STATS = [
  { value: "2026", label: "Founded", color: "#FF8C00" },
  { value: "40+", label: "Team members", color: "#00C9B1" },
  { value: "187", label: "Countries served", color: "#FF8C00" },
  { value: "$2.4T", label: "Supply chain value monitored", color: "#00C9B1" },
];

const VALUES = [
  { icon: Cpu, color: "#FF8C00", title: "AI-First, Always", desc: "We don't bolt AI onto existing processes. We architect every product decision around what autonomous intelligence makes possible." },
  { icon: Shield, color: "#00C9B1", title: "Trust is the Product", desc: "Supply chains carry the world's most critical goods. Our customers trust us with their most sensitive operations — we take that seriously." },
  { icon: Globe, color: "#FF8C00", title: "Global by Default", desc: "Supply chains are inherently global. Our platform is built for multi-language, multi-currency, multi-jurisdiction operations from day one." },
  { icon: TrendingUp, color: "#00C9B1", title: "Outcomes Over Features", desc: "We measure ourselves on your supply chain KPIs — not feature counts. Every capability we build is justified by measurable customer impact." },
  { icon: Heart, color: "#FF8C00", title: "Human + AI Collaboration", desc: "Autonomous doesn't mean human-free. We design AI that amplifies your team's judgment, not replaces it." },
  { icon: Lightbulb, color: "#00C9B1", title: "Relentless Simplicity", desc: "The most complex problems deserve the simplest interfaces. We obsess over making the hardest supply chain decisions feel effortless." },
];

const TIMELINE = [
  { year: "Q1 2026", event: "Logistria founded", desc: "Company incorporated with seed funding. First multi-agent supply chain prototype built." },
  { year: "Q2 2026", event: "Private Beta Launch", desc: "First 10 enterprise customers onboarded. Autonomous supplier agent achieves 94% forecast accuracy." },
  { year: "Q3 2026", event: "Series A — $28M", desc: "Raised Series A. Expanded to 3 new industries. Achieved $1T in monitored supply chain value." },
  { year: "Q4 2026", event: "Open Beta & Global Expansion", desc: "Platform opened to all customers. 187 countries now covered. 4.2s average AI decision latency." },
];

const TEAM = [
  { name: "Dr. Arjun Mehta", role: "CEO & Co-founder", bg: "from-[#FF8C00]/20 to-[#FF8C00]/5" },
  { name: "Sarah Chen", role: "CTO & Co-founder", bg: "from-[#00C9B1]/20 to-[#00C9B1]/5" },
  { name: "Marcus Okonkwo", role: "Chief Product Officer", bg: "from-[#FF8C00]/15 to-transparent" },
  { name: "Priya Venkatesh", role: "VP Engineering", bg: "from-[#00C9B1]/15 to-transparent" },
  { name: "James Hartley", role: "Head of AI Research", bg: "from-[#FF8C00]/10 to-transparent" },
  { name: "Yuki Tanaka", role: "VP Customer Success", bg: "from-[#00C9B1]/10 to-transparent" },
];

export default function AboutPage() {
  const hero = useReveal();
  const stats = useReveal();
  const values = useReveal();
  const timeline = useReveal();
  const team = useReveal();

  return (
    <div className="min-h-screen bg-[#081021] text-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,140,0,0.07) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,140,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.4) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />

        <div ref={hero.ref} className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div custom={0} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#FF8C00]/30 bg-[#FF8C00]/5 px-4 py-1.5 mb-7">
            <Zap className="size-3.5 text-[#FF8C00]" />
            <span className="text-[#FF8C00] text-xs font-semibold tracking-[0.2em] uppercase">Our Story</span>
          </motion.div>

          <motion.h1 custom={0.1} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.06] tracking-tight mb-6">
            We&apos;re Building the{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}>
              Nervous System
            </span>
            <br />of Global Trade.
          </motion.h1>

          <motion.p custom={0.2} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Logistria was founded on a simple belief: the world&apos;s supply chains are too important, too complex, and too fragile to be managed by spreadsheets and phone calls. We set out to build something better.
          </motion.p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-16 border-y border-white/[0.06] bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#FF8C00] text-xs font-bold tracking-[0.35em] uppercase mb-4">◈ Our Mission</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
                Make Every Supply Chain{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}>
                  Autonomous.
                </span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Global supply chains feed, clothe, and power civilisation. Yet they&apos;re still managed with manual processes that haven&apos;t changed since the 1980s. A port closes in Rotterdam and it takes 48 hours for a procurement manager to know — and another 48 to act.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Logistria changes that. Our multi-agent AI detects the closure in real-time, evaluates 200+ alternative routes, negotiates with carriers, and reroutes shipments — in 4.2 seconds. No email. No spreadsheet. No delay.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, label: "Mission", desc: "Eliminate supply chain latency through autonomous AI", color: "#FF8C00" },
                { icon: Globe, label: "Vision", desc: "A world where supply chains never fail due to human delay", color: "#00C9B1" },
                { icon: Lock, label: "Security", desc: "SOC 2 Type II certified. Enterprise-grade data protection", color: "#FF8C00" },
                { icon: Users, label: "Culture", desc: "Remote-first, outcome-obsessed, mission-driven", color: "#00C9B1" },
              ].map(({ icon: Icon, label, desc, color }) => (
                <div key={label} className="bg-slate-900/50 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors">
                  <div className="p-2 rounded-lg mb-3 w-fit" style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
                    <Icon className="size-4" style={{ color }} />
                  </div>
                  <p className="text-white font-bold text-sm mb-1">{label}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={stats.ref} className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div key={s.label} custom={0.07 * i} initial="hidden" animate={stats.inView ? "visible" : "hidden"} variants={fadeUp}
              className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-colors">
              <p className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section ref={values.ref} className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div custom={0} initial="hidden" animate={values.inView ? "visible" : "hidden"} variants={fadeUp} className="text-center mb-12">
          <p className="text-[#00C9B1] text-xs font-bold tracking-[0.35em] uppercase mb-4">◈ Our Values</p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            How We{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}>
              Build & Operate
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title} custom={0.07 * i} initial="hidden" animate={values.inView ? "visible" : "hidden"} variants={fadeUp}
                className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                <div className="p-2.5 rounded-xl mb-4 w-fit" style={{ backgroundColor: `${v.color}15`, border: `1px solid ${v.color}30` }}>
                  <Icon className="size-5" style={{ color: v.color }} />
                </div>
                <h3 className="text-white font-bold mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section ref={timeline.ref} className="py-20 border-y border-white/[0.06] bg-slate-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div custom={0} initial="hidden" animate={timeline.inView ? "visible" : "hidden"} variants={fadeUp} className="text-center mb-12">
            <p className="text-[#FF8C00] text-xs font-bold tracking-[0.35em] uppercase mb-4">◈ Journey</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              From Idea to{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}>
                Global Platform
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[18px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF8C00]/40 via-[#00C9B1]/40 to-transparent" />

            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <motion.div key={item.year} custom={0.1 * i} initial="hidden" animate={timeline.inView ? "visible" : "hidden"} variants={fadeUp}
                  className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"} pl-10 sm:pl-0`}>
                    <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors">
                      <span className="text-xs font-bold tracking-widest uppercase mb-1 block" style={{ color: i % 2 === 0 ? "#FF8C00" : "#00C9B1" }}>{item.year}</span>
                      <h3 className="text-white font-bold mb-1">{item.event}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-[11px] sm:left-1/2 sm:-translate-x-1/2 top-5 w-4 h-4 rounded-full border-2 z-10"
                    style={{ backgroundColor: "#081021", borderColor: i % 2 === 0 ? "#FF8C00" : "#00C9B1" }} />
                  {/* Spacer for alternate side */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section ref={team.ref} className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div custom={0} initial="hidden" animate={team.inView ? "visible" : "hidden"} variants={fadeUp} className="text-center mb-12">
          <p className="text-[#00C9B1] text-xs font-bold tracking-[0.35em] uppercase mb-4">◈ Leadership</p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Built by Supply Chain{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}>
              Obsessives
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mt-4 text-base">
            Our team combines deep expertise in AI, supply chain operations, enterprise software, and global logistics.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {TEAM.map((member, i) => (
            <motion.div key={member.name} custom={0.06 * i} initial="hidden" animate={team.inView ? "visible" : "hidden"} variants={fadeUp}
              className="bg-slate-900/50 border border-white/10 rounded-2xl p-5 text-center hover:border-white/20 transition-colors group">
              <div className={`w-14 h-14 rounded-full mx-auto mb-3 bg-gradient-to-br ${member.bg} flex items-center justify-center border border-white/10`}>
                <Users className="size-6 text-slate-400" />
              </div>
              <p className="text-white font-bold text-xs mb-1">{member.name}</p>
              <p className="text-slate-500 text-[10px] leading-tight">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <motion.p custom={0.4} initial="hidden" animate={team.inView ? "visible" : "hidden"} variants={fadeUp}
          className="text-center text-slate-500 text-sm mt-10">
          We&apos;re hiring across engineering, AI research, and customer success. &nbsp;
          <span className="text-[#00C9B1] cursor-pointer hover:underline">View open roles →</span>
        </motion.p>
      </section>

      {/* ── CTA ── */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl border border-[#FF8C00]/20 overflow-hidden p-10 md:p-14 text-center"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,140,0,0.06) 0%, rgba(8,16,33,0.9) 70%)", boxShadow: "0 0 80px rgba(255,140,0,0.06)" }}>
          <p className="text-[#FF8C00] text-xs font-bold tracking-[0.35em] uppercase mb-5">◈ Join Us</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Modernise<br />Your Supply Chain?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Talk to our team. Get a personalised walkthrough of how Logistria can transform your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login">
              <Button className="h-12 px-8 bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold tracking-wider shadow-xl shadow-[#FF8C00]/30 hover:scale-[1.02] transition-all">
                Access Control Tower <ArrowRight className="size-4 ml-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" className="h-12 px-8 bg-slate-900/50 border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all">
                See Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
