"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Box,
  Truck,
  TrendingUp,
  Zap,
  ArrowRight,
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

/* ─────────────────────────────────────────────
   Truck SVG (side-view lorry)
───────────────────────────────────────────── */
function TruckSVG() {
  return (
    <svg
      width="520"
      height="160"
      viewBox="0 0 520 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 0 14px #00C9B1aa) drop-shadow(0 0 6px #FF8C0066)" }}
    >
      {/* Trailer body */}
      <rect x="4" y="16" width="296" height="96" rx="6" fill="#061120" stroke="#00C9B1" strokeWidth="2.5" />
      {/* Trailer ribbing */}
      {[70, 140, 210, 280].map((x) => (
        <line key={x} x1={x} y1="16" x2={x} y2="112" stroke="#00C9B1" strokeOpacity="0.35" strokeWidth="1.5" />
      ))}
      {/* Trailer top accent stripe */}
      <rect x="4" y="16" width="296" height="6" rx="3" fill="#00C9B1" fillOpacity="0.35" />
      {/* Company branding on trailer */}
      <text x="72" y="72" fill="#00C9B1" fillOpacity="0.95" fontSize="18" fontFamily="monospace" fontWeight="800" letterSpacing="5">LOGISTRIA</text>
      <text x="84" y="92" fill="#FF8C00" fillOpacity="0.85" fontSize="11" fontFamily="monospace" fontWeight="600" letterSpacing="3">SUPPLY CHAIN</text>
      {/* Teal glow strip on trailer bottom */}
      <rect x="4" y="106" width="296" height="6" rx="3" fill="#00C9B1" fillOpacity="0.3" />

      {/* Cab body */}
      <path d="M300 32 L300 112 L472 112 L472 72 L442 32 L300 32 Z" fill="#061120" stroke="#00C9B1" strokeWidth="2.5" />
      {/* Cab roof accent */}
      <path d="M300 32 L442 32 L472 72 L300 72 Z" fill="#00C9B1" fillOpacity="0.06" />
      {/* Cab door line */}
      <line x1="378" y1="68" x2="378" y2="112" stroke="#00C9B1" strokeOpacity="0.45" strokeWidth="1.5" />
      {/* Door handle */}
      <rect x="356" y="88" width="14" height="4" rx="2" fill="#00C9B1" fillOpacity="0.75" />
      {/* Windshield */}
      <path d="M340 40 L340 80 L468 80 L468 72 L442 40 Z" fill="#00C9B1" fillOpacity="0.18" stroke="#00C9B1" strokeOpacity="0.7" strokeWidth="1.5" />
      {/* Windshield inner glow */}
      <path d="M348 46 L348 75 L460 75 L460 71 L438 46 Z" fill="#00C9B1" fillOpacity="0.07" />
      {/* Windshield wiper */}
      <line x1="368" y1="79" x2="418" y2="48" stroke="#00C9B1" strokeOpacity="0.5" strokeWidth="1.5" />
      {/* Headlight */}
      <rect x="465" y="70" width="14" height="20" rx="3" fill="#FFD580" fillOpacity="1" />
      <rect x="462" y="68" width="18" height="24" rx="4" fill="#FFB84D" fillOpacity="0.25" style={{ filter: "blur(6px)" }} />
      {/* Headlight beam */}
      <polygon points="479,75 510,62 510,98 479,90" fill="#FFD580" fillOpacity="0.12" />
      {/* Side mirror */}
      <rect x="468" y="48" width="10" height="14" rx="2" fill="#1E293B" stroke="#00C9B1" strokeOpacity="0.7" strokeWidth="1.5" />
      {/* Exhaust stack */}
      <rect x="322" y="4" width="8" height="30" rx="3" fill="#374151" stroke="#4B5563" strokeWidth="1" />
      <ellipse cx="326" cy="4" rx="5" ry="3" fill="#4B5563" />
      {/* Exhaust smoke puffs */}
      <circle cx="326" cy="2" r="4" fill="#4B5563" fillOpacity="0.4" />
      <circle cx="330" cy="-4" r="5" fill="#4B5563" fillOpacity="0.2" />

      {/* Connector hitch */}
      <rect x="290" y="64" width="20" height="30" rx="3" fill="#1E293B" stroke="#374151" strokeWidth="1.5" />

      {/* Undercarriage detail */}
      <rect x="4" y="112" width="296" height="8" rx="2" fill="#0A1830" stroke="#1E3050" strokeWidth="1" />
      <rect x="300" y="112" width="172" height="8" rx="2" fill="#0A1830" stroke="#1E3050" strokeWidth="1" />

      {/* Rear trailer wheel pair */}
      <g className="wheel-spin">
        <circle cx="82" cy="128" r="24" fill="#061120" stroke="#FF8C00" strokeWidth="3" />
        <circle cx="82" cy="128" r="10" fill="#FF8C00" fillOpacity="0.9" />
        <circle cx="82" cy="128" r="16" fill="none" stroke="#FF8C00" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 6" />
        <line x1="82" y1="104" x2="82" y2="152" stroke="#FF8C00" strokeOpacity="0.4" strokeWidth="2" />
        <line x1="58" y1="128" x2="106" y2="128" stroke="#FF8C00" strokeOpacity="0.4" strokeWidth="2" />
      </g>
      <g className="wheel-spin">
        <circle cx="192" cy="128" r="24" fill="#061120" stroke="#FF8C00" strokeWidth="3" />
        <circle cx="192" cy="128" r="10" fill="#FF8C00" fillOpacity="0.9" />
        <circle cx="192" cy="128" r="16" fill="none" stroke="#FF8C00" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 6" />
        <line x1="192" y1="104" x2="192" y2="152" stroke="#FF8C00" strokeOpacity="0.4" strokeWidth="2" />
        <line x1="168" y1="128" x2="216" y2="128" stroke="#FF8C00" strokeOpacity="0.4" strokeWidth="2" />
      </g>
      {/* Front cab wheel */}
      <g className="wheel-spin">
        <circle cx="406" cy="128" r="24" fill="#061120" stroke="#FF8C00" strokeWidth="3" />
        <circle cx="406" cy="128" r="10" fill="#FF8C00" fillOpacity="0.9" />
        <circle cx="406" cy="128" r="16" fill="none" stroke="#FF8C00" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 6" />
        <line x1="406" y1="104" x2="406" y2="152" stroke="#FF8C00" strokeOpacity="0.4" strokeWidth="2" />
        <line x1="382" y1="128" x2="430" y2="128" stroke="#FF8C00" strokeOpacity="0.4" strokeWidth="2" />
      </g>

      {/* Ground shadow / glow */}
      <ellipse cx="260" cy="154" rx="240" ry="6" fill="#00C9B1" fillOpacity="0.12" />
    </svg>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Radial glow */}
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
      {/* Ambient blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full bg-[#FF8C00]/4 blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[350px] md:w-[500px] h-[200px] md:h-[300px] rounded-full bg-[#00C9B1]/5 blur-[100px] pointer-events-none" />

      {/* ── Truck animation ── */}
      <div
        className="truck-ride absolute pointer-events-none select-none"
        style={{ bottom: "10%", left: 0, opacity: 0.82, willChange: "transform" }}
      >
        <TruckSVG />
      </div>
      {/* Road line */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "calc(10% - 2px)",
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(0,201,177,0.3) 15%, rgba(0,201,177,0.3) 85%, transparent)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-[#00C9B1]/30 bg-[#00C9B1]/5 px-3 sm:px-4 py-1.5 mb-6 sm:mb-8"
        >
          <Activity className="size-3.5 text-[#00C9B1]" />
          <span className="text-[#00C9B1] text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Now in Open Beta · Multi-Agent AI Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-5 sm:mb-6"
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
          className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10"
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
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link href="/store" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-12 px-8 bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold text-base tracking-wide shadow-2xl shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50 transition-all duration-200 hover:scale-[1.03]">
              Request Demo
              <ArrowRight className="size-4 ml-1" />
            </Button>
          </Link>
          <Link href="/platform" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto h-12 px-8 bg-slate-900/50 backdrop-blur-md border-white/15 text-white hover:bg-white/10 hover:border-white/30 font-semibold text-base transition-all duration-200"
            >
              <Globe className="size-4 mr-2 text-[#00C9B1]" />
              Explore Platform
            </Button>
          </Link>
        </motion.div>

        {/* Floating metric pills */}
        <motion.div
          custom={0.6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10 sm:mt-14"
        >
          {[
            { icon: Shield, text: "SOC 2 Type II", color: "#00C9B1" },
            { icon: Zap, text: "12ms Global Latency", color: "#FF8C00" },
            { icon: Activity, text: "99.97% Uptime SLA", color: "#00C9B1" },
          ].map(({ icon: Icon, text, color }) => (
            <div
              key={text}
              className="flex items-center gap-2 rounded-full bg-slate-900/60 backdrop-blur border border-white/10 px-3 sm:px-4 py-2"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
    <section ref={ref} className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
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
    <section ref={ref} className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
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
    <section ref={ref} className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
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

