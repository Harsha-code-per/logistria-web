"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";

const FOOTER_COLS = [
  {
    heading: "Platform",
    links: [
      { label: "Control Tower", href: "/platform" },
      { label: "AI Agents", href: "/platform" },
      { label: "Analytics", href: "/platform" },
      { label: "Integrations", href: "/platform" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Aerospace", href: "/solutions" },
      { label: "Automotive", href: "/solutions" },
      { label: "Retail & FMCG", href: "/solutions" },
      { label: "Energy", href: "/solutions" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Careers", href: "/about" },
      { label: "Security", href: "/about" },
    ],
  },
];

export function Footer() {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <Zap className="size-5 text-[#FF8C00]" />
              <span
                className="text-xl font-black tracking-[0.28em] text-white"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                LOGISTRIA
              </span>
              <span className="size-2 rounded-full bg-[#00C9B1] shadow-lg shadow-[#00C9B1]/50" />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Autonomous supply chain intelligence. From prediction to execution
              — without human latency.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

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
                You&apos;re on the list!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/40 border-white/10 text-white placeholder:text-slate-600 focus:border-[#00C9B1] h-10 text-sm flex-1 min-w-0"
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
          <div className="flex flex-wrap justify-center gap-5">
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
