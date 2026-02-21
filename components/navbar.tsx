"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#081021]/80 backdrop-blur-xl border-b border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Zap className="size-5 text-[#FF8C00]" />
          <span
            className="text-lg font-black tracking-[0.22em] text-white group-hover:text-white/90 transition-colors"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            LOGISTRIA
          </span>
          <span className="size-2 rounded-full bg-[#00C9B1] shadow-lg shadow-[#00C9B1]/60 animate-pulse hidden sm:block" />
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-7 text-sm text-slate-400">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`relative tracking-wide transition-colors duration-200 hover:text-white pb-0.5 ${
                  active ? "text-white" : ""
                }`}
              >
                {label}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-[#FF8C00] to-[#00C9B1] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:block">
            <Button className="bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold tracking-wider text-xs sm:text-sm h-9 px-4 sm:px-5 shadow-lg shadow-[#FF8C00]/25 hover:shadow-[#FF8C00]/50 transition-all duration-200 hover:scale-[1.02]">
              Control Tower
              <ChevronRight className="size-3.5 ml-0.5" />
            </Button>
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden border-t border-white/[0.07] bg-[#060e1c]/98 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between py-3 border-b border-white/[0.05] text-sm font-medium tracking-wide transition-colors ${
                      active ? "text-[#00C9B1]" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {label}
                    <ChevronRight className="size-4 text-slate-600" />
                  </Link>
                );
              })}
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-4"
              >
                <Button className="w-full bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-black font-bold tracking-wider text-sm h-11 shadow-lg shadow-[#FF8C00]/30">
                  Access Control Tower
                  <ChevronRight className="size-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
