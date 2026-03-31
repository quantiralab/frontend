import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const TEAL   = "#0a8f8c";
const PURPLE = "#9a3fca";
const BG     = "#0c0f12";

const sampleMaps: Record<string, { center: string; nodes: string[] }> = {
  "Machine Learning": { center: "Machine Learning", nodes: ["Neural Networks", "Supervised", "Unsupervised", "NLP", "Computer Vision", "Transformers"] },
  "Climate Change":   { center: "Climate Change",   nodes: ["Greenhouse Gases", "Renewables", "Deforestation", "Sea Level", "Carbon Capture", "Policy"] },
  "Startup Growth":   { center: "Startup Growth",   nodes: ["Product-Market Fit", "Fundraising", "Marketing", "Hiring", "Retention", "Scale"] },
};

const nodeColors   = ["#0ABAB5", "#56DFCF", "#c44dff", "#ff6b9d", "#0ABAB5", "#c44dff"];
const defaultTopic = "Machine Learning";

/* ══════════════════════════════════════════════════════════
   CANVAS 1 — DATA RAIN
   Vertical streams of falling hex/binary characters,
   like a Matrix rain but in teal + purple
══════════════════════════════════════════════════════════ */
const DataRainCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const CHARS = "01アイウエオABCDF∑∆∇∂ΩΞ∞≈≠01101010FFAB98CD".split("");
    const TEAL_RGB   = { r: 10,  g: 143, b: 140 };
    const PURPLE_RGB = { r: 154, g: 63,  b: 202 };

    let cols: { y: number; speed: number; charIdx: number; color: 0 | 1; opacity: number }[] = [];
    const COL_W = 22;

    const build = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const count = Math.floor(canvas.width / COL_W);
      cols = Array.from({ length: count }, (_, i) => ({
        y:       Math.random() * canvas.height,
        speed:   Math.random() * 1.4 + 0.6,
        charIdx: Math.floor(Math.random() * CHARS.length),
        color:   (i % 3 === 0 ? 1 : 0) as 0 | 1,
        opacity: Math.random() * 0.4 + 0.25,
      }));
    };

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    build();

    const loop = () => {
      // Semi-transparent overlay for trail effect
      ctx.fillStyle = `rgba(${parseInt(BG.slice(1,3),16)},${parseInt(BG.slice(3,5),16)},${parseInt(BG.slice(5,7),16)},0.06)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `13px monospace`;

      cols.forEach((col, i) => {
        const c    = col.color === 0 ? TEAL_RGB : PURPLE_RGB;
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x    = i * COL_W + 4;

        // bright lead character
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${col.opacity + 0.35})`;
        ctx.fillText(char, x, col.y);

        // faint trail chars above
        for (let k = 1; k <= 5; k++) {
          const trailAlpha = (col.opacity - k * 0.06) * 0.6;
          if (trailAlpha > 0) {
            ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${trailAlpha})`;
            ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, col.y - k * 16);
          }
        }

        col.y += col.speed * 1.8;
        if (col.y > canvas.height + 40) {
          col.y = -20;
          col.speed   = Math.random() * 1.4 + 0.6;
          col.opacity = Math.random() * 0.4 + 0.25;
          col.color   = (Math.random() > 0.65 ? 1 : 0) as 0 | 1;
        }
      });

      raf.current = requestAnimationFrame(loop);
    };
    loop();
    return () => { ro.disconnect(); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55, zIndex: 0 }}
    />
  );
};

/* ══════════════════════════════════════════════════════════
   CSS-ONLY DNA DOUBLE HELIX  
   Two sine waves of dots that mirror each other,
   rendered as framer-motion divs  
══════════════════════════════════════════════════════════ */
const DNA_POINTS = 18; // dots per strand

const HelixStrand = ({
  side,
  delay,
}: {
  side: "left" | "right";
  delay: number;
}) => {
  const isLeft = side === "left";
  return (
    <div
      className="absolute top-0 bottom-0 pointer-events-none"
      style={{
        width: 80,
        [isLeft ? "left" : "right"]: "4%",
        zIndex: 0,
      }}
    >
      {Array.from({ length: DNA_POINTS }, (_, i) => {
        const frac  = i / (DNA_POINTS - 1); // 0..1
        const yPct  = frac * 100;
        const wave  = Math.sin(frac * Math.PI * 4); // 2 full waves
        const xPct  = 50 + wave * 38 * (isLeft ? 1 : -1);
        const color = i % 2 === 0 ? TEAL : PURPLE;
        const size  = 5 + Math.abs(wave) * 4; // bigger at peaks

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size, height: size,
              background: color,
              boxShadow: `0 0 ${size * 2.5}px ${color}`,
              top:  `${yPct}%`,
              left: `${xPct}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              opacity:  [0.25, 0.9, 0.25],
              scale:    [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 2.5 + (i % 3) * 0.6,
              repeat: Infinity,
              delay: delay + i * 0.12,
              ease: "easeInOut",
            }}
          />
        );
      })}


    </div>
  );
};

/* ── Hex grid pattern ── */
const HexGrid = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ opacity: 0.06, zIndex: 0 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="hexPat" x="0" y="0" width="52" height="60" patternUnits="userSpaceOnUse">
        <polygon
          points="26,2 50,15 50,45 26,58 2,45 2,15"
          fill="none"
          stroke={TEAL}
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hexPat)" />
  </svg>
);



/* ── Corner scan beams ── */
const ScanBeams = () => (
  <>
    {/* top-left diagonal */}
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: 0, left: 0,
        width: "60%", height: 1,
        background: `linear-gradient(90deg, ${TEAL}80, transparent)`,
        transformOrigin: "left center",
        zIndex: 0,
      }}
      animate={{ rotate: [0, 35, 0], opacity: [0, 0.7, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut", repeatDelay: 4 }}
    />
    {/* bottom-right diagonal */}
    <motion.div
      className="absolute pointer-events-none"
      style={{
        bottom: 0, right: 0,
        width: "50%", height: 1,
        background: `linear-gradient(270deg, ${PURPLE}80, transparent)`,
        transformOrigin: "right center",
        zIndex: 0,
      }}
      animate={{ rotate: [0, -30, 0], opacity: [0, 0.65, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay: 3.5, ease: "easeInOut", repeatDelay: 5 }}
    />
  </>
);

/* ══════════════════════════════════════════════════════════
   ORIGINAL COMPONENT — untouched
══════════════════════════════════════════════════════════ */
const DemoTeaser = () => {
  const [topic, setTopic]           = useState("");
  const [active, setActive]         = useState<string>(defaultTopic);
  const [generating, setGenerating] = useState(false);

  const mapData = sampleMaps[active] || sampleMaps[defaultTopic];

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    const match = Object.keys(sampleMaps).find((k) =>
      k.toLowerCase().includes(topic.toLowerCase())
    );
    setTimeout(() => { setActive(match || defaultTopic); setGenerating(false); }, 1200);
  };

  const angleStep = (2 * Math.PI) / mapData.nodes.length;

  return (
    <section className="section-padding relative overflow-hidden">

      {/* ── ORIGINAL glow — kept exactly ── */}
      <div className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(196,77,255,0.06) 0%, transparent 70%)" }} />

      {/* ── NEW BACKGROUND LAYERS ── */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* solid dark base */}
        <div className="absolute inset-0" style={{ background: BG }} />

        {/* hex grid */}
        <HexGrid />

        {/* data rain */}
        <DataRainCanvas />

        {/* DNA helixes on sides */}
        <HelixStrand side="left"  delay={0}   />
        <HelixStrand side="right" delay={1.2} />

        {/* scan beams */}
        <ScanBeams />

        {/* top + bottom page blend */}
        <div className="absolute inset-x-0 top-0 h-20 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${BG}, transparent)`, zIndex: 3 }} />
        <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${BG}, transparent)`, zIndex: 3 }} />

        {/* center content area dark vignette so card stays readable */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2,
          background: "radial-gradient(ellipse 55% 55% at 50% 55%, transparent 0%, rgba(12,15,18,0.55) 100%)" }} />
      </div>

      {/* ── ORIGINAL CONTENT — 100% untouched ── */}
      <div className="max-w-4xl mx-auto text-center relative" style={{ zIndex: 10 }}>
        <motion.h2
          className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Try it <span className="gradient-text-pink">yourself</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Enter any topic and see QuantiraViz map your knowledge in real time.
        </motion.p>

        <motion.div
          className="flex gap-3 max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="e.g. Machine Learning, Climate Change..."
            className="flex-1 glass-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 rounded-xl placeholder:text-muted-foreground"
          />
          <button onClick={handleGenerate} className="btn-gradient flex items-center gap-2 text-sm whitespace-nowrap">
            <Sparkles className="w-4 h-4" /> Generate
          </button>
        </motion.div>

        <motion.div
          className="glass-card rounded-3xl p-8 max-w-lg mx-auto glow-border"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {generating ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-64 flex items-center justify-center">
                <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
              </motion.div>
            ) : (
              <motion.svg key={active} viewBox="0 0 300 300" className="w-full h-64"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <defs>
                  <filter id="demoGlow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {mapData.nodes.map((_, i) => {
                  const x = 150 + Math.cos(angleStep * i - Math.PI / 2) * 100;
                  const y = 150 + Math.sin(angleStep * i - Math.PI / 2) * 100;
                  return (
                    <motion.line key={i} x1={150} y1={150} x2={x} y2={y}
                      stroke={nodeColors[i % nodeColors.length]} strokeWidth={1.5} strokeOpacity={0.5}
                      filter="url(#demoGlow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }} />
                  );
                })}
                <motion.circle cx={150} cy={150} r={28} fill="#0ABAB5" fillOpacity={0.2}
                  stroke="#0ABAB5" strokeWidth={2} filter="url(#demoGlow)"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} />
                <motion.circle cx={150} cy={150} r={14} fill="#0ABAB5"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} />
                <text x={150} y={185} textAnchor="middle"
                  className="fill-foreground text-[10px] font-display font-semibold">
                  {mapData.center}
                </text>
                {mapData.nodes.map((label, i) => {
                  const x     = 150 + Math.cos(angleStep * i - Math.PI / 2) * 100;
                  const y     = 150 + Math.sin(angleStep * i - Math.PI / 2) * 100;
                  const color = nodeColors[i % nodeColors.length];
                  return (
                    <motion.g key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}>
                      <circle cx={x} cy={y} r={18} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={1.5} />
                      <circle cx={x} cy={y} r={6} fill={color} />
                      <text x={x} y={y + 28} textAnchor="middle" className="fill-muted-foreground text-[8px] font-body">
                        {label}
                      </text>
                    </motion.g>
                  );
                })}
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoTeaser;
