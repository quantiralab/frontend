import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Layers, Cpu, Compass } from "lucide-react";

const TEAL   = "#0a8f8c";
const PURPLE = "#9a3fca";
const BG     = "#0c0f12";

type SampleMap = {
  center: string;
  nodes: string[];
  sources: number;
  connections: number;
  summary: string;
  insights: string[];
};

/* ══════════════════════════════════════════════════════════
   10+ PRE-BUILT HIGH-VALUE QUANTIRALAB KNOWLEDGE MAPS
══════════════════════════════════════════════════════════ */
const sampleMaps: Record<string, SampleMap> = {
  "AI in Healthcare": {
    center: "AI in Healthcare",
    nodes: ["Diagnostics", "Clinical NLP", "Drug Discovery", "Medical Imaging", "Patient Records", "Regulatory"],
    sources: 42,
    connections: 18,
    summary: "Across 42 analyzed medical research repositories, clinical NLP and medical imaging emerge as the central bridge concepts, with patient data privacy cited as the primary boundary constraint.",
    insights: [
      "Clinical NLP appears in 68% of knowledge sources, forming the densest node in the medical map.",
      "Regulatory compliance and HIPAA privacy constraints represent the primary adoption barriers.",
      "Drug discovery knowledge clusters expanded 3x in recent literature, showing rapid convergence.",
      "QuantiraLab Insight: Prioritize secure, federated learning workflows to accelerate clinical deployment.",
    ],
  },
  "Sustainable Energy": {
    center: "Sustainable Energy",
    nodes: ["Solar Tech", "Wind Power", "Energy Storage", "Smart Grids", "Green Hydrogen", "Policy Incentives"],
    sources: 38,
    connections: 16,
    summary: "Analysis of 38 clean tech datasets confirms energy storage and smart grid infrastructure as the critical connectors between renewable generation and regional energy policy.",
    insights: [
      "Energy storage links to 100% of generation clusters, establishing itself as the core operational bottleneck.",
      "Solar and wind lead deployment volume, but green hydrogen exhibits the fastest topological growth.",
      "Policy incentives appear in 74% of mapped sources as the baseline catalyst for infrastructure funding.",
      "QuantiraLab Insight: Model grid storage capacity prior to evaluating regional generation expansion.",
    ],
  },
  "Market Research": {
    center: "Market Research",
    nodes: ["Competitor Analysis", "Customer Segments", "Market Trends", "Pricing Elasticity", "Sales Channels", "Brand Positioning"],
    sources: 27,
    connections: 14,
    summary: "From 27 intelligence reports, the QuantiraLab engine identifies customer segmentation and emerging market trends as the strongest signal cluster, with pricing elasticity as an underexplored node.",
    insights: [
      "Customer segments and market trends form a tightly coupled sub-graph with high signal density.",
      "Pricing elasticity represents an isolated node, indicating a critical gap in primary dataset collection.",
      "Competitor intelligence strongly correlates with narrative positioning strategies.",
      "QuantiraLab Insight: Commission targeted primary research on pricing sensitivity to bridge map gaps.",
    ],
  },
  "Startup Growth": {
    center: "Startup Growth",
    nodes: ["Product-Market Fit", "Fundraising", "Go-To-Market", "Talent Acquisition", "Net Retention", "Unit Economics"],
    sources: 31,
    connections: 13,
    summary: "The startup knowledge map positions Product-Market Fit as the foundational central hub, with Net Retention and scalable unit economics emerging as high-leverage downstream nodes.",
    insights: [
      "Product-Market Fit connects directly to all operational sub-nodes, serving as the central graph anchor.",
      "Net Retention metrics form the strongest secondary cluster influencing institutional fundraising.",
      "Talent acquisition exhibits high fragmentation across disparate operational contexts.",
      "QuantiraLab Insight: Align fundraising milestones directly with net retention rather than team headcount.",
    ],
  },
  "Machine Learning": {
    center: "Machine Learning",
    nodes: ["Neural Networks", "Supervised Learning", "Unsupervised Models", "Natural Language Processing", "Computer Vision", "Transformer Architectures"],
    sources: 54,
    connections: 21,
    summary: "Across 54 technical papers, Transformer Architectures serve as the primary convergence bridge between NLP and Computer Vision, while Supervised Learning remains the predominant applied paradigm.",
    insights: [
      "Transformer architectures link multimodal domains, serving as the map's structural backbone.",
      "Supervised learning paradigms appear in 80% of enterprise production deployments.",
      "Unsupervised learning remains relatively isolated, indicating significant opportunity for self-supervised research.",
      "QuantiraLab Insight: Monitor self-supervised foundation models as the next major architectural consolidation.",
    ],
  },
  "Climate Science": {
    center: "Climate Science",
    nodes: ["Greenhouse Gas Metrics", "Renewables Infrastructure", "Deforestation Tracking", "Ocean Acidification", "Carbon Capture", "International Policy"],
    sources: 47,
    connections: 19,
    summary: "Synthesis of 47 climate datasets reveals renewables infrastructure and international policy as the primary decision cluster, with carbon capture showing accelerated citation growth.",
    insights: [
      "Renewables Infrastructure and Policy form the most densely connected decision framework.",
      "Carbon Capture technologies demonstrate the highest month-over-month growth rate in literature citations.",
      "Deforestation data correlates directly with atmospheric greenhouse gas concentration spikes.",
      "QuantiraLab Insight: Integrate policy risk modeling alongside technological cost-curve forecasts.",
    ],
  },
  "Enterprise Cybersecurity": {
    center: "Enterprise Cybersecurity",
    nodes: ["Zero Trust Architecture", "Identity & Access (IAM)", "Threat Detection", "Cloud Security", "Data Encryption", "SOC Automation"],
    sources: 51,
    connections: 22,
    summary: "Analysis of 51 enterprise security frameworks positions Zero Trust Architecture and IAM as the structural foundation for modern multi-cloud threat mitigation.",
    insights: [
      "Zero Trust principles correlate with a 45% reduction in lateral movement breach severity.",
      "IAM identity boundaries represent the highest node density across hybrid cloud topologies.",
      "Automated Threat Detection is the primary growth vector in high-velocity SOC environments.",
      "QuantiraLab Insight: Prioritize continuous, identity-based authentication over perimeter defense tokens.",
    ],
  },
  "Fintech & Open Banking": {
    center: "Fintech & Open Banking",
    nodes: ["API Gateways", "Fraud Prevention AI", "Embedded Finance", "Regulatory Tech (RegTech)", "DeFi Protocols", "Core Ledger Systems"],
    sources: 39,
    connections: 17,
    summary: "Mapping 39 financial technology whitepapers highlights API Gateways and Fraud Prevention AI as core bridge nodes for embedded banking integration.",
    insights: [
      "API Gateways function as the structural connective tissue across 92% of mapped open banking platforms.",
      "Embedded Finance features demonstrate a 2.5x increase in consumer adoption density.",
      "RegTech compliance nodes form critical boundary constraints for cross-border real-time settlements.",
      "QuantiraLab Insight: Embed real-time fraud mitigation directly into payment routing API layers.",
    ],
  },
  "DevSecOps & Cloud Native": {
    center: "DevSecOps & Cloud Native",
    nodes: ["Kubernetes", "CI/CD Pipelines", "IaC Security Scanning", "Observability & Telemetry", "Microservices Architecture", "Container Registries"],
    sources: 44,
    connections: 20,
    summary: "Mapping 44 cloud architecture repositories identifies automated Infrastructure-as-Code (IaC) scanning inside CI/CD pipelines as the single most effective risk mitigation node.",
    insights: [
      "CI/CD pipelines represent the central orchestration hub connecting code creation to runtime deployment.",
      "IaC scanning integration reduces pre-production vulnerability leakage by up to 60%.",
      "Observability nodes bridge real-time runtime telemetry with static microservice dependency maps.",
      "QuantiraLab Insight: Shift security validation left by embedding automated policy gates into git commit hooks.",
    ],
  },
  "Supply Chain Intelligence": {
    center: "Supply Chain Intelligence",
    nodes: ["Demand Forecasting", "Logistics Tracking", "Supplier Risk Matrix", "Inventory AI", "Port Telematics", "Route Optimization"],
    sources: 33,
    connections: 15,
    summary: "Across 33 logistics datasets, Demand Forecasting and Supplier Risk Matrix form the core predictive pivot point for mitigating global disruption vectors.",
    insights: [
      "Demand Forecasting accuracy directly dictates down-stream Inventory AI replenishment signals.",
      "Supplier Risk assessment represents the single largest bottleneck in global lead-time compression.",
      "Route Optimization algorithms reduce carbon footprint while significantly driving down transit overhead.",
      "QuantiraLab Insight: Connect port telematics feeds directly with automated inventory reordering triggers.",
    ],
  },
};

const nodeColors   = ["#0ABAB5", "#56DFCF", "#c44dff", "#ff6b9d", "#0ABAB5", "#c44dff"];
const defaultTopic = "Machine Learning";
const presetPills  = ["Enterprise Cybersecurity", "Fintech & Open Banking", "AI in Healthcare", "DevSecOps & Cloud Native"];

/* ══════════════════════════════════════════════════════════
   QUANTIRALAB AI FALLBACK ENGINE
   Deterministically synthesizes a knowledge map for any
   novel keyword typed by the user (no reverting to ML).
══════════════════════════════════════════════════════════ */
const conceptPool = [
  "Core Architecture", "Data Ingestion Pipeline", "AI Analytics Engine",
  "Automation Framework", "Integration Layer", "Governance & Policy",
  "Performance Metrics", "Scalability Matrix", "Security & Compliance",
];

const generateCustomMap = (query: string): SampleMap => {
  const trimmed = query.trim();
  const formattedQuery = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  const hash = trimmed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const selectedNodes = Array.from({ length: 6 }, (_, i) => conceptPool[(hash + i) % conceptPool.length]);
  const sourcesCount     = 25 + (hash % 46);   // 25–70
  const connectionsCount = 12 + (hash % 19);   // 12–30

  return {
    center: formattedQuery,
    nodes: selectedNodes,
    sources: sourcesCount,
    connections: connectionsCount,
    summary: `QuantiraLab AI Engine synthesized ${sourcesCount} custom data repositories for "${formattedQuery}". The dynamic graph identifies strong structural relationships between ${selectedNodes[0]} and ${selectedNodes[1]}.`,
    insights: [
      `"${selectedNodes[0]}" emerges as the central bridge node within the synthesized knowledge map for ${formattedQuery}.`,
      `Intersections between ${selectedNodes[1]} and ${selectedNodes[2]} constitute the densest information cluster.`,
      `Governance and compliance parameters account for roughly ${(hash % 35) + 25}% of mapped relationship vectors.`,
      `QuantiraLab Recommendation: Focus analytical resources on optimizing ${selectedNodes[3]} to streamline decision-making.`,
    ],
  };
};

/* Loose fuzzy match: exact-ish substring in either direction, or shared
   significant word — falls through to the AI engine otherwise. */
const findFuzzyMatch = (query: string): string | undefined => {
  const clean = query.trim().toLowerCase();
  if (!clean) return undefined;

  const directHit = Object.keys(sampleMaps).find((k) => {
    const kl = k.toLowerCase();
    return kl.includes(clean) || clean.includes(kl);
  });
  if (directHit) return directHit;

  const queryWords = clean.split(/[\s&/,-]+/).filter((w) => w.length > 3);
  return Object.keys(sampleMaps).find((k) => {
    const keyWords = k.toLowerCase().split(/[\s&/,-]+/).filter((w) => w.length > 3);
    return queryWords.some((qw) => keyWords.some((kw) => kw.includes(qw) || qw.includes(kw)));
  });
};

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
      ctx.fillStyle = `rgba(${parseInt(BG.slice(1,3),16)},${parseInt(BG.slice(3,5),16)},${parseInt(BG.slice(5,7),16)},0.06)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `13px monospace`;

      cols.forEach((col, i) => {
        const c    = col.color === 0 ? TEAL_RGB : PURPLE_RGB;
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x    = i * COL_W + 4;

        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${col.opacity + 0.35})`;
        ctx.fillText(char, x, col.y);

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
══════════════════════════════════════════════════════════ */
const DNA_POINTS = 18;

const HelixStrand = ({ side, delay }: { side: "left" | "right"; delay: number }) => {
  const isLeft = side === "left";
  return (
    <div
      className="absolute top-0 bottom-0 pointer-events-none"
      style={{ width: 80, [isLeft ? "left" : "right"]: "4%", zIndex: 0 }}
    >
      {Array.from({ length: DNA_POINTS }, (_, i) => {
        const frac  = i / (DNA_POINTS - 1);
        const yPct  = frac * 100;
        const wave  = Math.sin(frac * Math.PI * 4);
        const xPct  = 50 + wave * 38 * (isLeft ? 1 : -1);
        const color = i % 2 === 0 ? TEAL : PURPLE;
        const size  = 5 + Math.abs(wave) * 4;

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
            animate={{ opacity: [0.25, 0.9, 0.25], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 2.5 + (i % 3) * 0.6, repeat: Infinity, delay: delay + i * 0.12, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
};

/* ── Hex grid pattern ── */
const HexGrid = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.06, zIndex: 0 }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="hexPat" x="0" y="0" width="52" height="60" patternUnits="userSpaceOnUse">
        <polygon points="26,2 50,15 50,45 26,58 2,45 2,15" fill="none" stroke={TEAL} strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hexPat)" />
  </svg>
);

/* ── Corner scan beams ── */
const ScanBeams = () => (
  <>
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: 0, left: 0, width: "60%", height: 1, background: `linear-gradient(90deg, ${TEAL}80, transparent)`, transformOrigin: "left center", zIndex: 0 }}
      animate={{ rotate: [0, 35, 0], opacity: [0, 0.7, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut", repeatDelay: 4 }}
    />
    <motion.div
      className="absolute pointer-events-none"
      style={{ bottom: 0, right: 0, width: "50%", height: 1, background: `linear-gradient(270deg, ${PURPLE}80, transparent)`, transformOrigin: "right center", zIndex: 0 }}
      animate={{ rotate: [0, -30, 0], opacity: [0, 0.65, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay: 3.5, ease: "easeInOut", repeatDelay: 5 }}
    />
  </>
);

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
const DemoTeaser = () => {
  const [topic, setTopic]           = useState("");
  const [activeData, setActiveData] = useState<SampleMap>(sampleMaps[defaultTopic]);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = (selectedQuery?: string) => {
    const queryToUse = (selectedQuery ?? topic).trim();
    if (!queryToUse) return;

    setGenerating(true);

    const matchedKey = findFuzzyMatch(queryToUse);

    setTimeout(() => {
      setActiveData(matchedKey ? sampleMaps[matchedKey] : generateCustomMap(queryToUse));
      setGenerating(false);
    }, 1000);
  };

  const angleStep = (2 * Math.PI) / activeData.nodes.length;

  return (
    <section className="section-padding relative overflow-hidden">
      {/* ── original ambient glow — kept exactly ── */}
      <div className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(196,77,255,0.06) 0%, transparent 70%)" }} />

      {/* ── background layers ── */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute inset-0" style={{ background: BG }} />
        <HexGrid />
        <DataRainCanvas />
        <HelixStrand side="left"  delay={0}   />
        <HelixStrand side="right" delay={1.2} />
        <ScanBeams />
        <div className="absolute inset-x-0 top-0 h-20 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${BG}, transparent)`, zIndex: 3 }} />
        <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${BG}, transparent)`, zIndex: 3 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2,
          background: "radial-gradient(ellipse 55% 55% at 50% 55%, transparent 0%, rgba(12,15,18,0.55) 100%)" }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-4"
        >
          <Cpu className="w-3.5 h-3.5" /> POWERED BY QUANTIRALAB AI ENGINE
        </motion.div>

        <motion.h2
          className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Try it <span className="gradient-text-pink">yourself</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-lg mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Enter any dataset, research area, or domain keyword to watch QuantiraLab transform complex information into an interactive visual knowledge map.
        </motion.p>

        <motion.div
          className="flex gap-3 max-w-md mx-auto mb-4"
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
            placeholder="e.g. Cybersecurity, Fintech, Clinical NLP..."
            className="flex-1 glass-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 rounded-xl placeholder:text-muted-foreground"
          />
          <button onClick={() => handleGenerate()} className="btn-gradient flex items-center gap-2 text-sm whitespace-nowrap">
            <Sparkles className="w-4 h-4" /> Generate
          </button>
        </motion.div>

        {/* Preset category pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          {presetPills.map((preset) => (
            <button
              key={preset}
              onClick={() => { setTopic(preset); handleGenerate(preset); }}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-teal-500/50 text-muted-foreground hover:text-white transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3 h-3 text-teal-400" /> {preset} <ArrowRight className="w-3 h-3 opacity-50" />
            </button>
          ))}
        </motion.div>

        <motion.div
          className="glass-card rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto glow-border text-left"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {generating ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-64 flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground font-mono tracking-widest">INGESTING SOURCES & MAPPING KNOWLEDGE GRAPH...</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeData.center}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* Result header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#0ABAB5", boxShadow: "0 0 10px #0ABAB5" }} />
                    <p className="font-display font-bold text-lg sm:text-xl">{activeData.center}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-widest"
                      style={{ background: "rgba(10,186,181,0.12)", border: "1px solid rgba(10,186,181,0.3)", color: "#0ABAB5" }}>
                      {activeData.sources} SOURCES INGESTED
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-widest"
                      style={{ background: "rgba(196,77,255,0.12)", border: "1px solid rgba(196,77,255,0.3)", color: "#c44dff" }}>
                      {activeData.connections} CONNECTIONS MAPPED
                    </span>
                  </div>
                </div>

                {/* Map + insights */}
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <motion.svg viewBox="0 0 300 300" className="w-full h-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <defs>
                        <filter id="demoGlow">
                          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      {activeData.nodes.map((_, i) => {
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
                      <text x={150} y={185} textAnchor="middle" className="fill-foreground text-[10px] font-display font-semibold">
                        {activeData.center}
                      </text>
                      {activeData.nodes.map((label, i) => {
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
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Layers className="w-3.5 h-3.5" style={{ color: "#c44dff" }} />
                      <p className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase" style={{ color: "#c44dff" }}>
                        What QuantiraLab AI Engine Surfaced
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {activeData.summary}
                    </p>
                    <ul className="space-y-2.5">
                      {activeData.insights.map((insight, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2.5 text-sm leading-relaxed"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.12 }}
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: nodeColors[i % nodeColors.length], boxShadow: `0 0 6px ${nodeColors[i % nodeColors.length]}` }}
                          />
                          <span className="text-muted-foreground">{insight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Result stats footer */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  {[
                    { label: "Mapped concepts",   value: String(activeData.nodes.length) },
                    { label: "Active connections", value: String(activeData.connections) },
                    { label: "Sources analyzed",  value: String(activeData.sources) },
                    { label: "Processing time",   value: "1.4s" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-mono text-lg font-bold" style={{ color: "#0ABAB5" }}>{stat.value}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoTeaser;