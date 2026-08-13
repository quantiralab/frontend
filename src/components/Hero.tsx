import { useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Zap, FileOutput, Play } from "lucide-react";

/* ─── TYPES ─────────────────────────────────────────── */
interface MapNode {
  id: number;
  x: number;
  y: number;
  label: string;
  color: string;
  size: number;
}

/* ─── KNOWLEDGE MAP ─────────────────────────────────── */
const initialNodes: MapNode[] = [
  { id: 0, x: 200, y: 140, label: "AI",     color: "#0ABAB5", size: 56 },
  { id: 1, x: 80,  y: 60,  label: "NLP",    color: "#56DFCF", size: 40 },
  { id: 2, x: 330, y: 70,  label: "Vision", color: "#c44dff", size: 40 },
  { id: 3, x: 100, y: 230, label: "Data",   color: "#ff6b9d", size: 36 },
  { id: 4, x: 310, y: 220, label: "ML",     color: "#56DFCF", size: 36 },
  { id: 5, x: 30,  y: 160, label: "LLM",   color: "#c44dff", size: 30 },
  { id: 6, x: 370, y: 155, label: "Graph",  color: "#ff6b9d", size: 30 },
  { id: 7, x: 200, y: 270, label: "Search", color: "#0ABAB5", size: 30 },
];

const edges = [
  [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 6], [3, 4], [3, 7], [4, 7],
];

const KnowledgeMap = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [dragging, setDragging] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const handlePointerDown = useCallback((id: number) => setDragging(id), []);
  const handlePointerUp   = useCallback(() => setDragging(null), []);
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (dragging === null) return;
      const svg = e.currentTarget;
      const pt  = svg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const sp = pt.matrixTransform(ctm.inverse());
      setNodes((prev) =>
        prev.map((n) => (n.id === dragging ? { ...n, x: sp.x, y: sp.y } : n))
      );
    },
    [dragging]
  );

  return (
    <svg
      viewBox="0 0 410 310"
      className="w-full h-full"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <defs>
        <linearGradient id="eg1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ABAB5" />
          <stop offset="100%" stopColor="#c44dff" />
        </linearGradient>
        <linearGradient id="eg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#56DFCF" />
          <stop offset="100%" stopColor="#ff6b9d" />
        </linearGradient>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-sm" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={i % 2 === 0 ? "url(#eg1)" : "url(#eg2)"}
          strokeWidth={hoveredNode === a || hoveredNode === b ? 2.5 : 1.5}
          strokeOpacity={hoveredNode !== null && hoveredNode !== a && hoveredNode !== b ? 0.15 : 0.55}
          filter="url(#glow-sm)"
          strokeDasharray="5 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1, strokeDashoffset: [0, -18] }}
          transition={{
            pathLength: { duration: 1.2, delay: 0.4 + i * 0.1 },
            opacity:    { duration: 0.4, delay: 0.4 + i * 0.1 },
            strokeDashoffset: { duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.5 },
            strokeOpacity: { duration: 0.3 },
            strokeWidth:   { duration: 0.3 },
          }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node) => (
        <g
          key={node.id}
          onPointerDown={() => handlePointerDown(node.id)}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          style={{ cursor: dragging === node.id ? "grabbing" : "grab" }}
        >
          {/* Outer pulse ring */}
          <motion.circle
            cx={node.x} cy={node.y}
            r={node.size / 2 + 8}
            fill="none"
            stroke={node.color}
            strokeWidth={1}
            strokeOpacity={hoveredNode === node.id ? 0.5 : 0}
            animate={{ r: [node.size / 2 + 6, node.size / 2 + 14, node.size / 2 + 6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: node.id * 0.3 }}
          />

          {/* Outer glow circle */}
          <motion.circle
            cx={node.x} cy={node.y}
            r={node.size / 2}
            fill={node.color}
            fillOpacity={hoveredNode === node.id ? 0.25 : 0.12}
            stroke={node.color}
            strokeWidth={1.5}
            strokeOpacity={0.7}
            filter="url(#glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: node.id * 0.08, stiffness: 200, damping: 18 }}
            whileHover={{ scale: 1.18 }}
          />

          {/* Inner dot */}
          <motion.circle
            cx={node.x} cy={node.y}
            r={node.size / 5}
            fill={node.color}
            filter="url(#glow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: node.id * 0.08 + 0.15 }}
          />

          {/* Label */}
          <motion.text
            x={node.x} y={node.y + node.size / 2 + 15}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fontFamily="inherit"
            fill={hoveredNode === node.id ? node.color : "rgba(255,255,255,0.45)"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: node.id * 0.08 + 0.3 }}
            style={{ pointerEvents: "none", userSelect: "none", transition: "fill 0.2s" }}
          >
            {node.label}
          </motion.text>
        </g>
      ))}
    </svg>
  );
};

/* ─── TYPING WORDS ──────────────────────────────────── */
const words = ["documents", "research", "meetings", "data", "ideas"];

const TypingWord = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[idx]}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35 }}
        className="gradient-text-hero inline-block [text-shadow:0_2px_12px_rgba(10,186,181,0.6)]"
      >
        {words[idx]}
      </motion.span>
    </AnimatePresence>
  );
};

/* ─── HERO ──────────────────────────────────────────── */
const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [4, -4]);
  const rotateY = useTransform(mouseX, [-300, 300], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      id="home"
      className="quantira-hero hero-bg relative min-h-screen flex items-center overflow-hidden pt-28 lg:pt-20 bg-[#0c0f12]"
    >
      {/*
        Responsive rules for background image swapping:
        - Mobile (<640px): Uses 500:500 square ratio image positioned at bottom center.
        - Tablet (640px - 1023px): Uses 500:500 square ratio image positioned at right center.
        - Desktop (>=1024px): Preserves original full desktop background asset.
      */}
      <style>{`
        /* Mobile Viewport (< 640px) */
        @media (max-width: 639px) {
          .quantira-hero.hero-bg {
            background-image: url('/images/500-500 ratio hero image.webp') !important;
            background-position: center bottom -10px !important;
            background-size: 85% auto !important;
            background-repeat: no-repeat !important;
          }
        }
        /* Tablet Viewport (640px to 1023px) */
        @media (min-width: 640px) and (max-width: 1023px) {
          .quantira-hero.hero-bg {
            background-image: url('/images/500-500 ratio hero image.webp') !important;
            background-position: right 10px center !important;
            background-size: contain !important;
            background-repeat: no-repeat !important;
          }
        }
        /* Desktop Viewport (>= 1024px) */
        @media (min-width: 1024px) {
          .quantira-hero.hero-bg {
            background-position: right center !important;
            background-size: cover !important;
          }
        }
      `}</style>

      {/* ── Background atmosphere (Clipped inside overflow-hidden to fix left border glow) ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Pinned left-corner green glow */}
        <div style={{ background: "radial-gradient(ellipse 60% 60% at 0% 50%, rgba(10,186,181,0.22) 0%, transparent 70%)", position: "absolute", inset: 0 }} />
        <div style={{ background: "radial-gradient(ellipse 50% 40% at 90% 25%, rgba(196,77,255,0.12) 0%, transparent 70%)", position: "absolute", inset: 0 }} />
        <div style={{ background: "radial-gradient(ellipse 40% 40% at 50% 85%, rgba(255,107,157,0.08) 0%, transparent 70%)", position: "absolute", inset: 0 }} />

        {/* Subtle grid */}
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.035 }}>
          <defs>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating orbs */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: 320, height: 320, top: "8%", left: "60%", background: "rgba(196,77,255,0.07)", filter: "blur(60px)" }}
          animate={{ y: [0, -30, 0], x: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 240, height: 240, top: "60%", left: "5%", background: "rgba(10,186,181,0.08)", filter: "blur(50px)" }}
          animate={{ y: [0, 24, 0], x: [0, -14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 180, height: 180, bottom: "10%", right: "10%", background: "rgba(255,107,157,0.07)", filter: "blur(40px)" }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
      </div>

      {/*
        Left-to-Right Readability Scrim:
        Keeps the left 52% dark for crisp text rendering on mobile/tablet,
        smoothly fading out to transparent on the right so her face and graphic shine through cleanly.
      */}
      <div
        className="absolute inset-0 lg:hidden pointer-events-none z-[1]"
        style={{
          background: "linear-gradient(to right, #0c0f12 0%, rgba(12,15,18,0.95) 52%, rgba(12,15,18,0.25) 80%, transparent 100%)",
        }}
      />

      {/* Mobile Top-to-Bottom Scrim */}
      <div
        className="absolute inset-x-0 top-0 h-[65%] sm:hidden pointer-events-none z-[1]"
        style={{
          background: "linear-gradient(to bottom, #0c0f12 0%, rgba(12,15,18,0.92) 60%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-10 items-center" style={{ zIndex: 10 }}>

        {/* ── LEFT: Text Copy Block ── */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg lg:max-w-none pb-48 sm:pb-12 lg:pb-0"
        >
          {/* Headline with text-shadow highlighting */}
          <motion.h1
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.08] mb-5 text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.95)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            Turn your{" "}
            <span style={{ display: "inline-block", minWidth: "5ch" }}>
              <TypingWord />
            </span>
            <br />
            into{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0ABAB5 0%, #56DFCF 50%, #c44dff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="[text-shadow:0_2px_12px_rgba(10,186,181,0.4)]"
            >
              Clarity
            </span>
          </motion.h1>

          {/* Subtext Paragraph */}
          <motion.p
            className="text-base sm:text-lg text-gray-100 max-w-md mb-9 leading-relaxed font-medium [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
          >
             Turn your documents, research, meetings, and data into explorable visual knowledge maps bringing clarity to complexity.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href="/QuantiraViz"
              className="btn-gradient inline-flex items-center gap-2 text-base px-7 py-3.5 rounded-xl font-semibold text-white shadow-[0_4px_20px_rgba(10,186,181,0.35)]"
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(10,186,181,0.55)" }}
              whileTap={{ scale: 0.97 }}
            >
              Explore QuantiraViz
              <ArrowRight size={16} strokeWidth={2.5} />
            </motion.a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;