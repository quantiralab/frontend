import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, LayoutGrid, Zap, DollarSign, BookOpen, Building2, ArrowRight, X, Menu } from "lucide-react";

const TEAL   = "#0a8f8c";
const PURPLE = "#9a3fca";
const BG     = "#0c0f12";

const navItems = [
  { label: "Home",         icon: Map,         href: "#"           },
  { label: "How it Works", icon: BookOpen,     href: "#how-it-works"},
  { label: "Features",     icon: LayoutGrid,   href: "#features"   },
  { label: "Pricing",      icon: DollarSign,   href: "#pricing"    },
  { label: "Company",      icon: Building2,    href: "#about"      },
];

const Navbar = () => {
  const [active, setActive]   = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll listener for scroll-based active state
  useEffect(() => {
    let currentActive = 0;
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150; // Offset for navbar height and buffer
      
      // Map nav items to section IDs
      const sectionMap = [
        "home",           // Home
        "how-it-works",   // How it Works
        "features",       // Features
        "pricing",        // Pricing
        "about",          // Company
      ];
      
      // Loop backwards to find the section we're in
      for (let i = sectionMap.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionMap[i]);
        if (section && section.offsetTop <= scrollPos) {
          if (currentActive !== i) {
            setActive(i);
            currentActive = i;
          }
          return;
        }
      }
      
      // If no section found, default to home
      setActive(0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check on mount
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll listener for backdrop blur effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── TOP BAR (logo + CTA) — visible on desktop ── */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 hidden lg:flex items-center justify-between px-10"
        style={{
          background: "transparent",
          backdropFilter: "none",
          borderBottom: "none",
          transition: "all 0.3s",
        }}
      >
        {/* Logo */}
        <img src="/images/Logo.svg" alt="KnoViz Logo" className="w-36 h-36" />
        {/* <a href="#" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${TEAL}, ${TEAL}99)`,
              boxShadow: `0 0 18px ${TEAL}55`,
            }}
          >
            <Map className="w-4 h-4" style={{ color: "#fff" }} />
          </div>
          <span
            className="font-display font-bold text-lg"
            style={{
              background: `linear-gradient(90deg, ${TEAL}, ${PURPLE})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            KnoViz
          </span>
        </a> */}

        {/* Right CTAs */}
        <div className="flex items-center gap-3">
          {/* <button
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
          >
            Log in
          </button> */}
          <motion.button
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold"
            style={{
              background: `linear-gradient(135deg, ${TEAL}, ${PURPLE})`,
              color: "#fff",
              boxShadow: `0 0 20px ${TEAL}40`,
            }}
            whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${TEAL}60` }}
            whileTap={{ scale: 0.97 }}
          >
             QuantiraViz <ArrowRight size={13} strokeWidth={2.5} />
          </motion.button>
        </div>
      </motion.div>

      {/* ── MIDDLE PILL NAV (desktop) — moved to top center ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:block"
      >
        {/* outer glow ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: `0 0 0 1px ${TEAL}20, 0 8px 40px ${BG}cc, 0 0 60px ${TEAL}12`,
          }}
        />

        <div
          className="flex items-center gap-1 px-2 py-2 rounded-full"
          style={{
            background: `linear-gradient(135deg, #13181f 0%, #0e1318 100%)`,
            border: `1px solid ${TEAL}25`,
            boxShadow: `0 4px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}
        >
          {navItems.map((item, i) => {
            const isActive = active === i;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setActive(i)}
                className="relative flex items-center gap-2.5 cursor-pointer select-none"
                style={{ textDecoration: "none" }}
                animate={{
                  paddingLeft:  isActive ? 18 : 14,
                  paddingRight: isActive ? 18 : 14,
                  paddingTop:   10,
                  paddingBottom: 10,
                }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {/* active pill background */}
                {isActive && (
                  <motion.div
                    layoutId="pill-bg"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${TEAL}22, ${PURPLE}18)`,
                      border: `1px solid ${TEAL}40`,
                      boxShadow: `0 0 18px ${TEAL}25, inset 0 1px 0 ${TEAL}30`,
                    }}
                    transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                )}

                {/* icon */}
                <motion.div
                  className="relative z-10 flex items-center justify-center rounded-full"
                  animate={{
                    color: isActive ? TEAL : "rgba(255,255,255,0.35)",
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {isActive ? (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${TEAL}35, ${PURPLE}25)`,
                        boxShadow: `0 0 14px ${TEAL}40`,
                      }}
                    >
                      <item.icon size={15} strokeWidth={2} style={{ color: TEAL }} />
                    </motion.div>
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <item.icon size={16} strokeWidth={1.8} />
                    </div>
                  )}
                </motion.div>

                {/* label — only when active */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, width: 0, x: -4 }}
                      animate={{ opacity: 1, width: "auto", x: 0 }}
                      exit={{ opacity: 0, width: 0, x: -4 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="relative z-10 text-sm font-semibold whitespace-nowrap overflow-hidden"
                      style={{ color: TEAL }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      {/* ── MOBILE: top bar with hamburger ── */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 lg:hidden flex items-center justify-between px-4 py-3"
        style={{
          background: `${BG}ee`,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${TEAL}18`,
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${TEAL}, ${TEAL}88)`,
              boxShadow: `0 0 14px ${TEAL}50`,
            }}
          >
            <Map className="w-4 h-4 text-white" />
          </div>
          <span
            className="font-display font-bold text-base"
            style={{
              background: `linear-gradient(90deg, ${TEAL}, ${PURPLE})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            KnoViz
          </span>
        </a>

        <motion.button
          className="w-9 h-9 flex items-center justify-center rounded-xl"
          style={{
            background: `${TEAL}12`,
            border: `1px solid ${TEAL}30`,
            color: TEAL,
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span key="x"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={18} />
              </motion.span>
            ) : (
              <motion.span key="m"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 top-16 z-40 lg:hidden rounded-2xl overflow-hidden"
            style={{
              background: `#0e1318ee`,
              border: `1px solid ${TEAL}22`,
              backdropFilter: "blur(24px)",
              boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${TEAL}15`,
            }}
          >
            {/* top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${TEAL}70, ${PURPLE}50, transparent)` }} />

            <div className="p-3 space-y-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setActive(i); setMobileOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                  style={{
                    textDecoration: "none",
                    background: active === i ? `${TEAL}12` : "transparent",
                    border: `1px solid ${active === i ? TEAL + "30" : "transparent"}`,
                    color: active === i ? TEAL : "rgba(255,255,255,0.55)",
                  }}
                >
                  <item.icon size={16} strokeWidth={1.8} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {active === i && (
                    <motion.div
                      layoutId="mobile-active"
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ background: TEAL, boxShadow: `0 0 8px ${TEAL}` }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            <div className="p-3 pt-0 flex flex-col gap-2">
              <div className="h-px w-full" style={{ background: `${TEAL}15` }} />
              <button
                className="w-full py-2.5 rounded-xl text-sm font-medium"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Log in
              </button>
              <button
                className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${TEAL}, ${PURPLE})`,
                  color: "#fff",
                  boxShadow: `0 0 20px ${TEAL}35`,
                }}
              >
                Start free <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;