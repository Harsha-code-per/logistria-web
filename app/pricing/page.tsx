"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  X,
  Building2,
  Rocket,
  Crown,
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

const PLANS = [
  {
    icon: Rocket,
    name: "Starter",
    tagline: "For teams getting started with supply chain visibility.",
    monthlyPrice: 990,
    color: "#00C9B1",
    highlight: false,
    features: [
      { label: "Up to 5 users", included: true },
      { label: "Real-time shipment tracking", included: true },
      { label: "Basic inventory monitoring", included: true },
      { label: "3 carrier integrations", included: true },
      { label: "Email & Slack alerts", included: true },
      { label: "Autonomous AI agents", included: false },
      { label: "Predictive analytics", included: false },
      { label: "ERP integration", included: false },
      { label: "Custom SLAs", included: false },
      { label: "Dedicated CSM", included: false },
    ],
    cta: "Start Free Trial",
    ctaHref: "/login",
  },
  {
    icon: Building2,
    name: "Professional",
    tagline: "For growing businesses that need AI-powered automation.",
    monthlyPrice: 3990,
    color: "#FF8C00",
    highlight: true,
    badge: "Most Popular",
    features: [
      { label: "Up to 30 users", included: true },
      { label: "Real-time shipment tracking", included: true },
      { label: "Full inventory management", included: true },
      { label: "50 carrier integrations", included: true },
      { label: "Email, Slack & PagerDuty alerts", included: true },
      { label: "Autonomous AI agents (3 types)", included: true },
      { label: "Predictive analytics", included: true },
      { label: "1 ERP integration", included: true },
      { label: "Standard SLAs", included: true },
      { label: "Dedicated CSM", included: false },
    ],
    cta: "Start Free Trial",
    ctaHref: "/login",
  },
  {
    icon: Crown,
    name: "Enterprise",
    tagline: "For global operations that demand full autonomy at scale.",
    monthlyPrice: null,
    color: "#00C9B1",
    highlight: false,
    features: [
      { label: "Unlimited users", included: true },
      { label: "Real-time shipment tracking", included: true },
      { label: "Full inventory management", included: true },
      { label: "200+ carrier integrations", included: true },
      { label: "All alert channels + webhooks", included: true },
      { label: "Full autonomous AI workforce", included: true },
      { label: "Advanced predictive analytics", included: true },
      { label: "Unlimited ERP integrations", included: true },
      { label: "Custom SLAs + 99.99% uptime", included: true },
      { label: "Dedicated CSM + Solution Architect", included: true },
    ],
    cta: "Contact Sales",
    ctaHref: "/about",
  },
];

const FAQS = [
  { q: "Is there a free trial?", a: "Yes — all plans include a 30-day free trial with full platform access. No credit card required to start." },
  { q: "Can I change plans later?", a: "Absolutely. You can upgrade, downgrade, or cancel at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle." },
  { q: "How does billing work?", a: "Plans are billed monthly or annually. Annual billing gives you 2 months free. All prices shown are per month, billed annually." },
  { q: "What counts as a 'user'?", a: "A user is anyone who logs in to the Logistria platform. API-only service accounts do not count toward your user limit." },
  { q: "Do you offer custom contracts?", a: "Yes. Enterprise customers can negotiate custom terms, MSAs, and DPAs. Contact our sales team to get started." },
];

export default function PricingPage() {
  const hero = useReveal();
  const plans = useReveal();
  const faq = useReveal();
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  const discount = billing === "annual" ? 0.83 : 1;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#081021] text-slate-900 dark:text-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,201,177,0.07) 0%, transparent 70%)" }} />

        <div ref={hero.ref} className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div custom={0} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[#00C9B1]/30 bg-[#00C9B1]/5 px-4 py-1.5 mb-7">
            <Zap className="size-3.5 text-[#00C9B1]" />
            <span className="text-[#00C9B1] text-xs font-semibold tracking-[0.2em] uppercase">Transparent Pricing</span>
          </motion.div>

          <motion.h1 custom={0.1} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.06] tracking-tight mb-5">
            Simple Pricing.{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8C00, #00C9B1)" }}>
              No Surprises.
            </span>
          </motion.h1>

          <motion.p custom={0.2} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto mb-10">
            Start free. Scale as you grow. Every plan includes a 30-day trial with full platform access.
          </motion.p>

          {/* Billing toggle */}
          <motion.div custom={0.3} initial="hidden" animate={hero.inView ? "visible" : "hidden"} variants={fadeUp}
            className="inline-flex items-center bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-full p-1">
            {(["monthly", "annual"] as const).map((b) => (
              <button key={b} onClick={() => setBilling(b)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${billing === b ? "bg-[#FF8C00] text-black shadow-lg" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
                {b === "monthly" ? "Monthly" : "Annual"}
                {b === "annual" && <span className="ml-2 text-[10px] font-bold bg-[#00C9B1]/20 text-[#00C9B1] px-1.5 py-0.5 rounded-full">2 months free</span>}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section ref={plans.ref} className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            const price = plan.monthlyPrice ? Math.round(plan.monthlyPrice * discount) : null;
            return (
              <motion.div key={plan.name} custom={0.08 * i} initial="hidden" animate={plans.inView ? "visible" : "hidden"} variants={fadeUp}
                className={`relative border rounded-2xl overflow-hidden transition-all duration-300 ${plan.highlight ? "bg-slate-100 dark:bg-slate-800/80 border-[#FF8C00]/40 shadow-2xl shadow-[#FF8C00]/10" : "bg-white dark:bg-slate-900/50 border-slate-200 dark:border-white/10 shadow-sm hover:border-slate-300 dark:hover:border-white/20"}`}
                style={plan.highlight ? { boxShadow: "0 0 60px rgba(255,140,0,0.08)" } : {}}>

                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF8C00] to-transparent" />
                )}
                {plan.badge && (
                  <div className="absolute top-5 right-5 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#FF8C00] text-black">
                    {plan.badge}
                  </div>
                )}

                <div className="p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${plan.color}15`, border: `1px solid ${plan.color}30` }}>
                      <Icon className="size-5" style={{ color: plan.color }} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{plan.name}</h3>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">{plan.tagline}</p>

                  <div className="mb-6">
                    {price ? (
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-black" style={{ color: plan.color }}>${price.toLocaleString()}</span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm mb-1.5">/month</span>
                      </div>
                    ) : (
                      <span className="text-4xl font-black" style={{ color: plan.color }}>Custom</span>
                    )}
                    {billing === "annual" && price && (
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Billed annually (${(price * 12).toLocaleString()}/yr)</p>
                    )}
                  </div>

                  <Link href={plan.ctaHref} className="block">
                    <Button className={`w-full h-11 font-bold tracking-wider text-sm transition-all ${plan.highlight ? "bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black shadow-lg shadow-[#FF8C00]/25" : "bg-white/80 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10"}`}>
                      {plan.cta} <ArrowRight className="size-4 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="border-t border-slate-100 dark:border-white/[0.06] px-7 py-5 space-y-3">
                  {plan.features.map((f) => (
                    <div key={f.label} className="flex items-center gap-3">
                      {f.included
                        ? <CheckCircle2 className="size-4 shrink-0" style={{ color: plan.color }} />
                        : <X className="size-4 shrink-0 text-slate-600" />}
                      <span className={`text-sm ${f.included ? "text-slate-600 dark:text-slate-300" : "text-slate-400 dark:text-slate-600"}`}>{f.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise footnote */}
        <motion.p custom={0.3} initial="hidden" animate={plans.inView ? "visible" : "hidden"} variants={fadeUp}
          className="text-center text-slate-500 dark:text-slate-400 text-sm mt-8">
          All plans include SOC 2 Type II compliance, 99.97% SLA, and 24/7 support. &nbsp;
          <Link href="/about" className="text-[#00C9B1] hover:underline">Contact sales</Link> for volume discounts.
        </motion.p>
      </section>

      {/* ── FAQ ── */}
      <section ref={faq.ref} className="py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div custom={0} initial="hidden" animate={faq.inView ? "visible" : "hidden"} variants={fadeUp} className="text-center mb-12">
          <p className="text-[#FF8C00] text-xs font-bold tracking-[0.35em] uppercase mb-4">◈ FAQ</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Common Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((item, i) => (
            <motion.div key={item.q} custom={0.07 * i} initial="hidden" animate={faq.inView ? "visible" : "hidden"} variants={fadeUp}
              className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-slate-300 dark:hover:border-white/20 transition-colors">
              <p className="text-slate-900 dark:text-white font-semibold mb-2">{item.q}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="cta-banner-bg relative rounded-3xl border border-[#FF8C00]/20 overflow-hidden p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Start Your Free Trial Today</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">30 days. Full access. No credit card. Cancel anytime.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login">
              <Button className="h-12 px-8 bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold tracking-wider shadow-xl shadow-[#FF8C00]/30 hover:scale-[1.02] transition-all">
                Get Started Free <ArrowRight className="size-4 ml-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="h-12 px-8 bg-white/80 dark:bg-slate-900/50 border-slate-200 dark:border-white/15 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
