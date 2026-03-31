import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

const TEAL   = "#0a8f8c";
const PURPLE = "#9a3fca";
const BG     = "#0c0f12";

const testimonials = [
  {
    step: "01",
    tag: "RESEARCH & DISCOVERY",
    title: "Smart Knowledge Mapping",
    quote: "QuantiraViz turned our 250-page research reports into interactive, explorable knowledge maps our team actually uses. It's like Google Maps—but for ideas and insights.",
    name: "Steffani Nina",
    role: "Head of Research, Synapse Labs",
    avatar: "/images/17.png",
    image: null as string | null,
    color: TEAL,
    stats: [
      { label: "REPORTS MAPPED", value: "200+" },
      { label: "TIME SAVED",     value: "80%"  },
      { label: "TEAM ADOPTION",  value: "100%" },
      { label: "ACCURACY",       value: "99.1%"},
      { label: "PROJECTS",       value: "12"   },
      { label: "UPTIME SLA",     value: "99.9%"},
    ],
    highlight: "80%",
    highlightLabel: "FASTER KNOWLEDGE RETRIEVAL",
  },
  {
    step: "02",
    tag: "PRODUCT & COLLABORATION",
    title: "Real-time Team Collaboration",
    quote: "We replaced three separate tools with QuantiraViz. The visual knowledge mapping is incredibly intuitive, and the real-time collaboration features have transformed how our team works together.",
    name: "Daniel Kim",
    role: "Product Lead, NovaTech",
    avatar: "/images/19.png",
    image: null as string | null,
    color: PURPLE,
    stats: [
      { label: "TOOLS REPLACED", value: "3×"   },
      { label: "PRODUCTIVITY",   value: "+40%" },
      { label: "LIVE CURSORS",   value: "50+"  },
      { label: "SYNC SPEED",     value: "<50ms"},
      { label: "INTEGRATIONS",   value: "20+"  },
      { label: "UPTIME SLA",     value: "99.9%"},
    ],
    highlight: "40%",
    highlightLabel: "PRODUCTIVITY INCREASE",
  },
  {
    step: "03",
    tag: "ACADEMIC & RESEARCH",
    title: "Instant Literature Review",
    quote: "I mapped my entire thesis literature review in 20 minutes. What used to take weeks of manual work is now instant.",
    name: "Steffani Lia",
    role: "PhD Candidate, MIT",
    avatar: "/images/18.png",
    image: null as string | null,
    color: TEAL,
    stats: [
      { label: "SETUP TIME",    value: "20min"},
      { label: "PAPERS MAPPED", value: "340+" },
      { label: "AI ACCURACY",   value: "97%"  },
      { label: "WEEKS SAVED",   value: "6wks" },
      { label: "CITATIONS",     value: "Auto" },
      { label: "UPTIME SLA",    value: "99.9%"},
    ],
    highlight: "6 wks",
    highlightLabel: "OF WORK IN 20 MINUTES",
  },
  {
    step: "04",
    tag: "ENTERPRISE & SCALE",
    title: "Enterprise Ready Platform",
    quote: "The best knowledge visualization tool I've ever used. Period. Our team productivity increased 40% in the first month.",
    name: "Jammes Andrew",
    role: "CEO, DataBridge",
    avatar: "/images/20.png",
    image: null as string | null,
    color: PURPLE,
    stats: [
      { label: "SOC 2 II",   value: "✓"    },
      { label: "AES-256",    value: "✓"    },
      { label: "SSO/SAML",   value: "✓"    },
      { label: "ON-PREM",    value: "✓"    },
      { label: "RBAC",       value: "✓"    },
      { label: "UPTIME SLA", value: "99.9%"},
    ],
    highlight: "99.9%",
    highlightLabel: "UPTIME SLA",
  },
];

/* ══════════════════════════════════════════════════════════
   CANVAS NEURAL NETWORK — boosted visibility
══════════════════════════════════════════════════════════ */
const hexToRgb = (hex: string) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
});

const lerpColor = (from: string, to: string, t: number) => {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
};

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  phase: number;
  speed: number;
};

const NeuralCanvas = ({ activeColor }: { activeColor: string }) => {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const particles      = useRef<Particle[]>([]);
  const raf            = useRef<number>(0);
  const currentRgb     = useRef(hexToRgb(activeColor));
  const targetRgb      = useRef(hexToRgb(activeColor));
  const lerpT          = useRef(1);

  const init = useCallback((w: number, h: number) => {
    const count = Math.max(40, Math.floor((w * h) / 9000));
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2.5 + 1.5,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init(canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const CONNECT_DIST = 160;

    const loop = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Lerp color
      lerpT.current = Math.min(lerpT.current + 0.025, 1);
      const c = {
        r: Math.round(currentRgb.current.r + (targetRgb.current.r - currentRgb.current.r) * lerpT.current),
        g: Math.round(currentRgb.current.g + (targetRgb.current.g - currentRgb.current.g) * lerpT.current),
        b: Math.round(currentRgb.current.b + (targetRgb.current.b - currentRgb.current.b) * lerpT.current),
      };
      if (lerpT.current >= 1) {
        currentRgb.current = { ...targetRgb.current };
        lerpT.current = 1;
      }

      const ps = particles.current;
      const t  = performance.now() / 1000;

      // Move
      ps.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        // tiny random nudge
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 0.7) { p.vx /= spd * 0.7; p.vy /= spd * 0.7; }
      });

      // Draw connections
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d  = Math.hypot(dx, dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.55; // was 0.18 → now 0.55
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
            ctx.lineWidth   = 1.2;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      ps.forEach((p) => {
        const pulse = 0.6 + 0.4 * Math.sin(t * p.speed * 60 + p.phase);
        const alpha = 0.7 * pulse; // was 0.3 → now 0.7

        // glow halo
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        grd.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${alpha * 0.5})`);
        grd.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // solid dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
        ctx.fill();
      });

      raf.current = requestAnimationFrame(loop);
    };

    loop();
    return () => { ro.disconnect(); cancelAnimationFrame(raf.current); };
  }, [init]);

  // Update target when color changes
  useEffect(() => {
    targetRgb.current = hexToRgb(activeColor);
    lerpT.current = 0;
  }, [activeColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }} // full opacity, visibility controlled per-element
    />
  );
};

/* ── Large drifting orb blobs ── */
const DriftingOrbs = ({ color }: { color: string }) => {
  const alt = color === TEAL ? PURPLE : TEAL;
  return (
    <>
      {/* big left orb */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500, height: 500,
          background: `radial-gradient(circle, ${color}30 0%, transparent 65%)`,
          filter: "blur(50px)",
          top: "-10%", left: "-10%",
        }}
        animate={{ x: [0, 80, 20, 0], y: [0, 60, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* right alt orb */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 420, height: 420,
          background: `radial-gradient(circle, ${alt}28 0%, transparent 65%)`,
          filter: "blur(60px)",
          bottom: "-10%", right: "-10%",
        }}
        animate={{ x: [0, -70, -20, 0], y: [0, -50, -90, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
      {/* center small orb */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 280, height: 280,
          background: `radial-gradient(circle, ${color}22 0%, transparent 65%)`,
          filter: "blur(40px)",
          top: "35%", right: "20%",
        }}
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 60, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 10 }}
      />
    </>
  );
};

/* ── Grid lines ── */
const GridLines = ({ color }: { color: string }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `
        linear-gradient(${color}18 1px, transparent 1px),
        linear-gradient(90deg, ${color}18 1px, transparent 1px)
      `,
      backgroundSize: "55px 55px",
      maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
    }}
  />
);

/* ── Shooting lines that streak across ── */
const ShootingLines = ({ color }: { color: string }) => (
  <>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute pointer-events-none"
        style={{
          height: 1,
          width: 120 + i * 60,
          background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
          top: `${25 + i * 22}%`,
          left: 0,
          opacity: 0,
        }}
        animate={{
          x: ["-10%", "110%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3 + i * 0.8,
          repeat: Infinity,
          delay: i * 4 + 2,
          ease: "easeInOut",
          repeatDelay: 6 + i * 3,
        }}
      />
    ))}
  </>
);

/* ────────────────────────────────────────────────
   Profile image
──────────────────────────────────────────────── */
const ProfileImage = ({ src, avatar, color, name }: { src: string | null; avatar: string; color: string; name: string }) => (
  <div className="relative flex-shrink-0" style={{ width: 64, height: 64 }}>
    <motion.div className="absolute inset-0 rounded-full pointer-events-none"
      style={{ border: `2px solid ${color}45` }}
      animate={{ boxShadow: [`0 0 10px ${color}25, 0 0 0 0 ${color}00`, `0 0 22px ${color}55, 0 0 0 4px ${color}10`, `0 0 10px ${color}25, 0 0 0 0 ${color}00`] }}
      transition={{ duration: 2.5, repeat: Infinity }} />
    <div className="absolute rounded-full overflow-hidden flex items-center justify-center"
      style={{ inset: 3, background: src ? "transparent" : `linear-gradient(135deg, ${color}28, ${color}0e)`, border: `1px solid ${color}30` }}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center justify-center gap-0.5 w-full h-full">
          {/* <User size={16} style={{ color: `${color}70` }} /> */}
          <span className="font-display font-bold text-xs leading-none" style={{ color }}><img src={avatar} alt={name} className="w-full h-full object-cover" /></span>
        </div>
      )}
    </div>
  </div>
);

/* ── Ghost cards ── */
const GhostCard = ({ stackIndex, color }: { stackIndex: number; color: string }) => (
  <div className="absolute inset-0 rounded-2xl"
    style={{
      background: `linear-gradient(135deg, #0d1117 0%, ${color}06 100%)`,
      border: `1px solid ${color}15`,
      transform: `translateY(${-stackIndex * 16}px) scale(${1 - stackIndex * 0.05})`,
      transformOrigin: "bottom center",
      zIndex: -stackIndex,
    }} />
);

/* ── Active card ── */
const TestimonialCard = ({ t, direction }: { t: (typeof testimonials)[0]; direction: number }) => (
  <motion.div
    key={t.step}
    initial={{ opacity: 0, x: direction * 100, scale: 0.95 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: direction * -100, scale: 0.95 }}
    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="absolute inset-0 rounded-2xl overflow-hidden"
    style={{
      background: `linear-gradient(135deg, #0d1117 0%, ${t.color}0e 100%)`,
      border: `1px solid ${t.color}30`,
      boxShadow: `0 20px 60px ${t.color}18`,
      zIndex: 10,
    }}
  >
    <div className="absolute top-5 right-6 font-mono text-5xl font-bold select-none pointer-events-none"
      style={{ color: `${t.color}12` }}>{t.step}</div>

    <div className="p-7 h-full flex flex-col justify-between">
      <div>
        {/* profile row */}
        <div className="flex items-center gap-4 mb-5 pb-5" style={{ borderBottom: `1px solid ${t.color}15` }}>
          <ProfileImage src={t.image} avatar={t.avatar} color={t.color} name={t.name} />
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-base leading-tight">{t.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5 mb-1.5">{t.role}</p>
            <span className="inline-block text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-sm"
              style={{ color: t.color, border: `1px solid ${t.color}38`, background: `${t.color}10` }}>
              {t.tag}
            </span>
          </div>
          <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full self-start"
            style={{ background: `${t.color}10`, border: `1px solid ${t.color}28` }}>
            <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }}
              animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[9px] font-mono font-bold tracking-widest" style={{ color: t.color }}>VERIFIED</span>
          </div>
        </div>

        <h3 className="font-display font-bold text-xl mb-4">{t.title}</h3>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {t.stats.map((s, i) => (
            <div key={i} className="rounded-lg px-3 py-2 text-center"
              style={{ background: `${t.color}0d`, border: `1px solid ${t.color}22` }}>
              <p className="text-[9px] font-mono tracking-wide" style={{ color: `${t.color}65` }}>{s.label}</p>
              <p className="font-display font-bold text-sm mt-0.5" style={{ color: t.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">"{t.quote}"</p>
      </div>

      <div className="mt-4 pt-4 flex items-end justify-between" style={{ borderTop: `1px solid ${t.color}15` }}>
        <div>
          <p className="font-display font-bold text-3xl" style={{ color: t.color }}>{t.highlight}</p>
          <p className="text-[9px] font-mono tracking-widest mt-0.5" style={{ color: `${t.color}65` }}>{t.highlightLabel}</p>
        </div>
        <div className="text-right">
          <p className="font-display font-semibold text-sm">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ── Section ── */
const Testimonials = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState(1);
  const isThrottled = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isThrottled.current) return;
      const rect          = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewH         = window.innerHeight;
      const scrolled      = -rect.top;
      const maxScroll     = sectionHeight - viewH;
      const progress      = Math.min(Math.max(scrolled / maxScroll, 0), 1);
      const newIndex      = Math.min(Math.floor(progress * testimonials.length), testimonials.length - 1);
      if (newIndex !== current) {
        setDirection(newIndex > current ? 1 : -1);
        setCurrent(newIndex);
        isThrottled.current = true;
        setTimeout(() => { isThrottled.current = false; }, 200);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [current]);

  const prev = () => { if (current === 0) return; setDirection(-1); setCurrent((c) => c - 1); };
  const next = () => { if (current === testimonials.length - 1) return; setDirection(1); setCurrent((c) => c + 1); };

  const t     = testimonials[current];
  const next1 = testimonials[(current + 1) % testimonials.length];
  const next2 = testimonials[(current + 2) % testimonials.length];
  const col   = t.color;

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${testimonials.length * 100}vh` }}>

      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ─── BACKGROUND STACK ─── */}

        {/* 1. dark base */}
        <div className="absolute inset-0" style={{ background: BG }} />

        {/* 2. big radial center glow — very visible */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse 75% 65% at 50% 50%, ${col}22 0%, ${col}08 40%, transparent 70%)`,
          }}
        />

        {/* 3. grid lines */}
        <GridLines color={col} />

        {/* 4. drifting orbs — large and visible */}
        <DriftingOrbs color={col} />

        {/* 5. canvas neural net */}
        <NeuralCanvas activeColor={col} />

        {/* 6. shooting lines */}
        <ShootingLines color={col} />

        {/* 7. top + bottom fade so it blends with page */}
        <div className="absolute inset-x-0 top-0 h-24 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
        <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${BG}, transparent)` }} />

        {/* ─── CONTENT ─── */}
        <div className="relative flex flex-col items-center justify-center h-full px-4" style={{ zIndex: 10 }}>

          {/* heading */}
          <motion.div className="text-center mb-10"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.div className="w-2 h-2 rounded-full" style={{ background: TEAL }}
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: TEAL }}>TESTIMONIALS</span>
              <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${TEAL}60, transparent)` }} />
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-2">
              Loved by <span className="gradient-text">curious minds</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              Scroll to explore how teams use QuantiraViz
            </p>
          </motion.div>

          {/* card stack */}
          <div className="relative w-full max-w-xl flex-shrink-0" style={{ height: 460 }}>
            <GhostCard stackIndex={2} color={next2.color} />
            <GhostCard stackIndex={1} color={next1.color} />
            <AnimatePresence mode="wait" custom={direction}>
              <TestimonialCard key={current} t={t} direction={direction} />
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="flex items-center gap-5 mt-8">
            <motion.button onClick={prev} disabled={current === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30"
              style={{ border: `1px solid ${TEAL}35`, background: `${TEAL}0a`, color: TEAL }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((item, i) => (
                <motion.button key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="h-1.5 rounded-full transition-all duration-300"
                  animate={{ width: i === current ? 24 : 8 }}
                  style={{
                    background: i === current ? item.color : `${item.color}30`,
                    boxShadow:  i === current ? `0 0 8px ${item.color}70` : "none",
                  }} />
              ))}
            </div>

            <motion.button onClick={next} disabled={current === testimonials.length - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30"
              style={{ border: `1px solid ${TEAL}35`, background: `${TEAL}0a`, color: TEAL }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <p className="text-xs font-mono mt-3" style={{ color: `${TEAL}45` }}>
            Step {current + 1} of {testimonials.length} — {t.title}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;