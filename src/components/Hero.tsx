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

/* ─── BADGE STRIP ───────────────────────────────────── */
// const badges = [
//   { icon: Sparkles,   text: "No coding needed",          color: "#0ABAB5" },
//   { icon: Zap,        text: "Real-time AI mapping",       color: "#c44dff" },
//   { icon: FileOutput, text: "Export to Notion, PDF, Figma", color: "#ff6b9d" },
// ];

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
        className="gradient-text-hero inline-block"
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
      className="relative min-h-screen flex items-center overflow-hidden pt-24 lg:pt-0"
      style={{
        backgroundImage: "url(/images/Hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 -z-10">
        <div style={{ background: "radial-gradient(ellipse 70% 55% at 15% 55%, rgba(10,186,181,0.14) 0%, transparent 60%)", position: "absolute", inset: 0 }} />
        <div style={{ background: "radial-gradient(ellipse 55% 45% at 85% 25%, rgba(196,77,255,0.11) 0%, transparent 60%)", position: "absolute", inset: 0 }} />
        <div style={{ background: "radial-gradient(ellipse 40% 40% at 55% 85%, rgba(255,107,157,0.08) 0%, transparent 60%)", position: "absolute", inset: 0 }} />

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-10 items-center">

        {/* ── LEFT: Copy ── */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow pill */}
          {/* <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7"
            style={{ background: "rgba(10,186,181,0.08)", border: "1px solid rgba(10,186,181,0.22)" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <motion.span
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#0ABAB5", display: "inline-block" }}
              animate={{ boxShadow: ["0 0 6px #0ABAB5", "0 0 16px #0ABAB5", "0 0 6px #0ABAB5"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span style={{ fontSize: 11, color: "#0ABAB5", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              AI-powered knowledge maps
            </span>
          </motion.div> */}

          {/* Headline */}
          <motion.h1
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.08] mb-5"
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
            >
              Clarity
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-md mb-9 leading-relaxed"
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
            <motion.button
              className="btn-gradient flex items-center gap-2 text-base px-7 py-3.5 rounded-xl font-semibold"
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(10,186,181,0.45)" }}
              whileTap={{ scale: 0.97 }}
            >
              Start Visualizing Free
              <ArrowRight size={16} strokeWidth={2.5} />
            </motion.button>

            {/* <motion.button
              className="flex items-center gap-2 text-sm font-medium px-5 py-3.5 rounded-xl transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)" }}
              whileHover={{ background: "rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.95)" }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "rgba(10,186,181,0.15)", border: "1px solid rgba(10,186,181,0.3)" }}
              >
                <Play size={11} style={{ color: "#0ABAB5", marginLeft: 1 }} />
              </div>
              Watch 45s demo
            </motion.button> */}
          </motion.div>

          {/* Badge strip */}
          {/* <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            {badges.map((b, i) => (
              <motion.span
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
                style={{
                  background: `${b.color}10`,
                  border: `1px solid ${b.color}25`,
                  color: "rgba(255,255,255,0.55)",
                }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                whileHover={{ color: "rgba(255,255,255,0.9)", borderColor: `${b.color}55` }}
              >
                <b.icon size={12} style={{ color: b.color }} />
                {b.text}
              </motion.span>
            ))}
          </motion.div> */}

          {/* Social proof */}
          {/* <motion.div
            className="flex items-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            
            <div className="flex -space-x-2">
              {["#0ABAB5", "#c44dff", "#ff6b9d", "#56DFCF"].map((c, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: `${c}22`, border: `2px solid rgba(10,10,14,0.9)`, color: c, zIndex: 4 - i, outline: `1px solid ${c}40` }}
                >
                  {["AK", "RS", "JM", "LT"][i]}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
              <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>150,000+</span> researchers & teams worldwide
            </p>
          </motion.div> */}
        </motion.div>

        {/* ── RIGHT: Map card ── */}
        {/* <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.92, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        >
          
          <div
            className="absolute -inset-4 rounded-[2.5rem]"
            style={{
              background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(10,186,181,0.12) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
          >
            
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(16px)",
                padding: "28px",
              }}
            >
              
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(10,186,181,0.7), rgba(196,77,255,0.5), transparent)" }}
              />

            
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {["#ff6b9d", "#ffcc44", "#56DFCF"].map((c) => (
                      <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>knowledge-map.kviz</span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                  style={{ background: "rgba(10,186,181,0.1)", border: "1px solid rgba(10,186,181,0.2)" }}
                >
                  <motion.span
                    style={{ width: 5, height: 5, borderRadius: "50%", background: "#0ABAB5", display: "inline-block" }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span style={{ fontSize: 10, color: "#0ABAB5", fontWeight: 600 }}>AI mapping…</span>
                </div>
              </div>

          
              <div style={{ height: 300 }}>
                <KnowledgeMap />
              </div>

              
              <div
                className="flex justify-between mt-4 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                {[
                  { val: "8", lbl: "concepts", color: "#0ABAB5" },
                  { val: "9", lbl: "connections", color: "#c44dff" },
                  { val: "0.3s", lbl: "AI time", color: "#ff6b9d" },
                ].map(({ val, lbl, color }) => (
                  <div key={lbl} className="text-center">
                    <p style={{ fontSize: 16, fontWeight: 700, color, margin: 0 }}>{val}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", margin: 0 }}>{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div> */}

          {/* Floating chips */}
          {/* <motion.div
            className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: "rgba(196,77,255,0.12)", border: "1px solid rgba(196,77,255,0.25)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{ opacity: { delay: 1, duration: 0.4 }, y: { delay: 1, duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}
          >
            <Sparkles size={13} style={{ color: "#c44dff" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#c44dff" }}>AI insights ready</span>
          </motion.div> */}

          {/* <motion.div
            className="absolute -bottom-4 -left-4 flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: "rgba(255,107,157,0.12)", border: "1px solid rgba(255,107,157,0.25)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{ opacity: { delay: 1.2, duration: 0.4 }, y: { delay: 1.2, duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          >
            <Zap size={13} style={{ color: "#ff6b9d" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#ff6b9d" }}>Drag to explore</span>
          </motion.div> */}
        {/* </motion.div> */}
      </div>
    </section>
  );
};

export default Hero;