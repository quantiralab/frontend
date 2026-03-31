import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Map, Users, Globe, FileText, Zap, Shield, Layers,
  ArrowUpRight, Brain, Sparkles, Network,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────── */
const stats = [
  { icon: Map,      value: 2_000_000,  suffix: "+", label: "Maps Created",       color: "#0ABAB5" },
  { icon: Users,    value: 150_000,    suffix: "+", label: "Users Worldwide",     color: "#56DFCF" },
  { icon: Globe,    value: 120,        suffix: "+", label: "Countries",           color: "#c44dff" },
  { icon: FileText, value: 50_000_000, suffix: "+", label: "Documents Processed", color: "#ff6b9d" },
];

const values = [
  { icon: Brain,   title: "AI-first thinking",    desc: "Every feature starts with: how can intelligence make this effortless?",    color: "#0ABAB5" },
  { icon: Shield,  title: "Privacy by design",    desc: "Your knowledge is yours. End-to-end encrypted, never used for training.",  color: "#c44dff" },
  { icon: Layers,  title: "Depth over breadth",   desc: "We go deep on knowledge mapping instead of building a feature factory.",   color: "#56DFCF" },
  { icon: Network, title: "Connected by default", desc: "Collaboration is not a tier — it is the foundation of how KnoViz works.", color: "#ff6b9d" },
];

const team = [
  { name: "Aiko Tanaka",   role: "Co-founder & CEO",   initials: "AT", color: "#0ABAB5", bg: "rgba(10,186,181,0.12)"  },
  { name: "Ravi Mehta",    role: "Co-founder & CTO",   initials: "RM", color: "#c44dff", bg: "rgba(196,77,255,0.12)"  },
  { name: "Sofia Reyes",   role: "Head of Design",     initials: "SR", color: "#ff6b9d", bg: "rgba(255,107,157,0.12)" },
  { name: "James O'Brien", role: "Lead AI Researcher", initials: "JO", color: "#56DFCF", bg: "rgba(86,223,207,0.12)"  },
];

const milestones = [
  {
    year: "2021", title: "Founded",       num: "01", tag: "PHASE_INCEPTION",  color: "#0a8f8c",
    desc: "Three researchers, one whiteboard, one big idea. The seed of QuantiraViz was planted in a late-night conversation about why knowledge stays trapped in documents.",
  },
  {
    year: "2022", title: "Seed Round",    num: "02", tag: "PHASE_DISCOVERY",  color: "#9a3fca",
    desc: "$4M raised. First 500 beta users onboarded. Our AI mapping engine hit 90% accuracy and the team grew from 3 to 12 passionate builders.",
  },
  {
    year: "2023", title: "Public Launch", num: "03", tag: "PHASE_EXPANSION",  color: "#0a8f8c",
    desc: "50K users signed up in the first 30 days. Product Hunt #1 of the day. Real-time collaboration shipped. The knowledge revolution had begun.",
  },
  {
    year: "2024", title: "Series A",      num: "04", tag: "PHASE_DEPLOYMENT", color: "#9a3fca",
    desc: "$22M raised. Expanded to 120 countries. Enterprise plan launched with SOC 2 compliance, SSO, and dedicated infrastructure for mission-critical workloads.",
  },
];

/* ── Integration items with color accents ── */
const integrations = [
  { name: "Notion",       color: "#0a8f8c" },
  { name: "Slack",        color: "#9a3fca" },
  { name: "Google Docs",  color: "#0a8f8c" },
  { name: "Confluence",   color: "#9a3fca" },
  { name: "Figma",        color: "#0a8f8c" },
  { name: "GitHub",       color: "#9a3fca" },
  { name: "Jira",         color: "#0a8f8c" },
  { name: "Linear",       color: "#9a3fca" },
  { name: "Zapier",       color: "#0a8f8c" },
  { name: "Airtable",     color: "#9a3fca" },
  { name: "Miro",         color: "#0a8f8c" },
  { name: "Obsidian",     color: "#9a3fca" },
];

const TEAL   = "#0a8f8c";
const PURPLE = "#9a3fca";
const BG     = "#0c0f12";

/* ─── ANIMATED COUNTER ─────────────────────────────────── */
const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 2000, startTime = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [inView, value]);
  const format = (n: number) =>
    n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + "M" : n >= 1_000 ? (n / 1_000).toFixed(0) + "K" : n.toString();
  return <span ref={ref}>{format(display)}{suffix}</span>;
};

/* ─── PARALLAX IMAGE CARD ───────────────────────────────── */
const ParallaxImageCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
      {/* <motion.div style={{ y }} className="absolute inset-[-10%]">
        <div className="w-full h-full" style={{
          background: `radial-gradient(circle at 30% 40%, rgba(10,186,181,0.25) 0%, transparent 50%),
            radial-gradient(circle at 75% 60%, rgba(196,77,255,0.20) 0%, transparent 45%),
            radial-gradient(circle at 55% 20%, rgba(86,223,207,0.15) 0%, transparent 40%),
            linear-gradient(135deg, rgba(10,186,181,0.08) 0%, rgba(196,77,255,0.08) 100%)`,
          backgroundColor: "rgba(255,255,255,0.03)",
        }} />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 450" fill="none" style={{ opacity: 0.6 }}>
          <line x1="150" y1="120" x2="300" y2="200" stroke="#0ABAB5" strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="300" y1="200" x2="420" y2="130" stroke="#0ABAB5" strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="300" y1="200" x2="380" y2="320" stroke="#c44dff" strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="380" y1="320" x2="200" y2="330" stroke="#c44dff" strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="200" y1="330" x2="150" y2="120" stroke="#56DFCF" strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="420" y1="130" x2="480" y2="280" stroke="#ff6b9d" strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="480" y1="280" x2="380" y2="320" stroke="#ff6b9d" strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="100" y1="260" x2="200" y2="330" stroke="#56DFCF" strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="150" y1="120" x2="80"  y2="180" stroke="#0ABAB5" strokeWidth="1" strokeDasharray="4 4"/>
          <circle cx="300" cy="200" r="18" fill="rgba(10,186,181,0.2)"  stroke="#0ABAB5" strokeWidth="1.5"/>
          <circle cx="300" cy="200" r="6"  fill="#0ABAB5"/>
          <circle cx="150" cy="120" r="12" fill="rgba(86,223,207,0.2)"  stroke="#56DFCF" strokeWidth="1.5"/>
          <circle cx="150" cy="120" r="4"  fill="#56DFCF"/>
          <circle cx="420" cy="130" r="12" fill="rgba(196,77,255,0.2)"  stroke="#c44dff" strokeWidth="1.5"/>
          <circle cx="420" cy="130" r="4"  fill="#c44dff"/>
          <circle cx="380" cy="320" r="14" fill="rgba(255,107,157,0.2)" stroke="#ff6b9d" strokeWidth="1.5"/>
          <circle cx="380" cy="320" r="5"  fill="#ff6b9d"/>
          <circle cx="200" cy="330" r="10" fill="rgba(10,186,181,0.2)"  stroke="#0ABAB5" strokeWidth="1.5"/>
          <circle cx="200" cy="330" r="3"  fill="#0ABAB5"/>
          <circle cx="480" cy="280" r="10" fill="rgba(86,223,207,0.2)"  stroke="#56DFCF" strokeWidth="1.5"/>
          <circle cx="480" cy="280" r="3"  fill="#56DFCF"/>
          <circle cx="100" cy="260" r="8"  fill="rgba(196,77,255,0.2)"  stroke="#c44dff" strokeWidth="1.5"/>
          <circle cx="100" cy="260" r="3"  fill="#c44dff"/>
          <circle cx="80"  cy="180" r="8"  fill="rgba(255,107,157,0.2)" stroke="#ff6b9d" strokeWidth="1.5"/>
          <circle cx="80"  cy="180" r="3"  fill="#ff6b9d"/>
          <text x="310" y="196" fill="#0ABAB5" fontSize="9" fontFamily="monospace">core concept</text>
          <text x="160" y="116" fill="#56DFCF" fontSize="8" fontFamily="monospace">research</text>
          <text x="430" y="126" fill="#c44dff" fontSize="8" fontFamily="monospace">insight</text>
          <text x="390" y="316" fill="#ff6b9d" fontSize="8" fontFamily="monospace">output</text>
        </svg>
      </motion.div>
      <div className="absolute inset-0 rounded-3xl" style={{ border:"1px solid rgba(255,255,255,0.08)", background:"linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 60%)" }}/> */}
      <img src= "/images/Making Knowledge Visible.png" alt="Parallax Visual" className="w-full h-full object-cover"/>
     </div>
  );
};

/* ─── SECTION 5 COMPONENTS ─────────────────────────────── */
const DiamondNode = ({ color, num }: { color: string; num: string }) => (
  <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 60, height: 60 }}>
    <motion.div
      className="absolute inset-0"
      style={{ transform: "rotate(45deg)", border: `2px solid ${color}40`, borderRadius: 8 }}
      animate={{ boxShadow: [`0 0 8px ${color}20`, `0 0 28px ${color}55`, `0 0 8px ${color}20`] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    />
    <div className="absolute" style={{
      width: 38, height: 38, transform: "rotate(45deg)",
      background: `linear-gradient(135deg, ${color}28, ${color}0a)`,
      border: `1.5px solid ${color}55`, borderRadius: 6,
    }} />
    <motion.div
      className="absolute"
      style={{ width: 52, height: 52, transform: "rotate(45deg)", border: `1px dashed ${color}25`, borderRadius: 10 }}
      animate={{ rotate: [45, 405] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    />
    <span className="relative z-10 font-mono font-bold text-sm" style={{ color }}>{num}</span>
  </div>
);

const NeuralDeco = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 340 180" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.12 }}>
    <circle cx="60"  cy="55"  r="3" fill={color}/><circle cx="170" cy="90"  r="5" fill={color}/>
    <circle cx="260" cy="40"  r="2" fill={color}/><circle cx="300" cy="140" r="3" fill={color}/>
    <circle cx="40"  cy="140" r="2" fill={color}/><circle cx="150" cy="155" r="3" fill={color}/>
    <line x1="60"  y1="55"  x2="170" y2="90"  stroke={color} strokeWidth="0.7"/>
    <line x1="170" y1="90"  x2="260" y2="40"  stroke={color} strokeWidth="0.7"/>
    <line x1="170" y1="90"  x2="300" y2="140" stroke={color} strokeWidth="0.7"/>
    <line x1="40"  y1="140" x2="170" y2="90"  stroke={color} strokeWidth="0.7"/>
    <line x1="150" y1="155" x2="300" y2="140" stroke={color} strokeWidth="0.7"/>
    <circle cx="170" cy="90" r="8" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5"/>
  </svg>
);

const ZigCard = ({ m, align, index }: { m: typeof milestones[0]; align: "left"|"right"; index: number }) => {
  const isRight = align === "right";
  const clipCut = 22;
  const clipPath = isRight
    ? `polygon(0 0, calc(100% - ${clipCut}px) 0, 100% ${clipCut}px, 100% 100%, ${clipCut}px 100%, 0 calc(100% - ${clipCut}px))`
    : `polygon(${clipCut}px 0, 100% 0, 100% calc(100% - ${clipCut}px), calc(100% - ${clipCut}px) 100%, 0 100%, 0 ${clipCut}px)`;
  return (
    <motion.div className="relative overflow-hidden w-full"
      style={{ background:`linear-gradient(135deg,#0d1117 0%,${m.color}0d 100%)`, border:`1px solid ${m.color}28`, clipPath, maxWidth:400 }}
      whileHover={{ borderColor:`${m.color}60`, boxShadow:`0 0 36px ${m.color}18`, y:-5, transition:{ duration:0.22 } }}>
      <NeuralDeco color={m.color}/>
      <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background:`linear-gradient(90deg,transparent,${m.color}30,transparent)` }}
        animate={{ top:["0%","100%"] }} transition={{ duration:4+index,repeat:Infinity,ease:"linear" }}/>
      {isRight ? (
        <>
          <div className="absolute top-0 right-0 pointer-events-none" style={{ width:clipCut,height:clipCut,background:`${m.color}20` }}/>
          <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width:clipCut,height:clipCut,background:`${m.color}12` }}/>
        </>
      ) : (
        <>
          <div className="absolute top-0 left-0 pointer-events-none" style={{ width:clipCut,height:clipCut,background:`${m.color}20` }}/>
          <div className="absolute bottom-0 right-0 pointer-events-none" style={{ width:clipCut,height:clipCut,background:`${m.color}12` }}/>
        </>
      )}
      <div className={`relative z-10 p-6 ${isRight?"text-right":"text-left"}`}>
        <div className={`flex items-center gap-2 mb-3 ${isRight?"flex-row-reverse justify-start":""}`}>
          <span className="text-[9px] font-mono font-bold tracking-widest px-2 py-0.5"
            style={{ color:m.color,border:`1px solid ${m.color}40`,background:`${m.color}10` }}>{m.tag}</span>
          <span className="font-mono text-xs font-bold" style={{ color:`${m.color}75` }}>{m.year}</span>
        </div>
        <h4 className="font-display font-bold text-lg mb-2 uppercase tracking-wide leading-tight">{m.title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
        <div className={`flex items-center gap-1 mt-4 ${isRight?"justify-end":"justify-start"}`}>
          {[28,12,6].map((w,i)=>(
            <motion.div key={i} className="h-0.5 rounded-full"
              style={{ width:w,background:m.color,opacity:1-i*0.3 }}
              animate={{ opacity:[1-i*0.3,(1-i*0.3)*0.3,1-i*0.3] }}
              transition={{ duration:2,repeat:Infinity,delay:i*0.25 }}/>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ZigzagRow = ({ m, index }: { m: typeof milestones[0]; index: number }) => {
  const isLeft = index % 2 === 0;
  return (
    <motion.div className="flex items-center gap-0"
      initial={{ opacity:0,y:36 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
      transition={{ delay:index*0.14,duration:0.55,ease:[0.22,1,0.36,1] }}>
      <div className="flex-1 flex justify-end pr-5">
        {isLeft ? <ZigCard m={m} align="right" index={index}/> : <div/>}
      </div>
      <div className="flex-shrink-0 flex flex-col items-center" style={{ zIndex:2 }}>
        <DiamondNode color={m.color} num={m.num}/>
      </div>
      <div className="flex-1 flex justify-start pl-5">
        {!isLeft ? <ZigCard m={m} align="left" index={index}/> : <div/>}
      </div>
    </motion.div>
  );
};

const Spine = () => (
  <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none" style={{ width:2,zIndex:0 }}>
    <motion.div className="w-full h-full"
      style={{ background:`linear-gradient(180deg,transparent 0%,${TEAL}55 12%,${PURPLE}45 50%,${TEAL}40 88%,transparent 100%)` }}
      initial={{ scaleY:0,originY:0 }} whileInView={{ scaleY:1 }} viewport={{ once:true }}
      transition={{ duration:1.5,ease:"easeOut",delay:0.1 }}/>
  </div>
);

/* ══════════════════════════════════════════════════════════
   SECTION 7 — HORIZONTAL AUTO-SCROLL MARQUEE
══════════════════════════════════════════════════════════ */

/* Single integration pill */
const IntegrationPill = ({ name, color }: { name: string; color: string }) => (
  <motion.div
    className="flex-shrink-0 flex items-center gap-3 px-5 py-3 mx-3 rounded-xl cursor-default select-none"
    style={{
      background: `linear-gradient(135deg, ${color}12, ${color}05)`,
      border: `1px solid ${color}30`,
      backdropFilter: "blur(8px)",
    }}
    whileHover={{
      borderColor: `${color}65`,
      boxShadow: `0 0 20px ${color}20`,
      y: -3,
      transition: { duration: 0.18 },
    }}
  >
    {/* colored dot */}
    <motion.div
      className="w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() * 2 }}
    />
    <span className="font-display font-semibold text-sm whitespace-nowrap" style={{ color: "rgba(255,255,255,0.8)" }}>
      {name}
    </span>
  </motion.div>
);

/* Marquee row — direction controls scroll direction */
const MarqueeRow = ({ items, direction = 1, speed = 35 }: {
  items: typeof integrations;
  direction?: 1 | -1;
  speed?: number;
}) => {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items, ...items];
  const totalItems = items.length;
  // Estimate width: ~160px per pill on average
  const totalW = totalItems * 163;

  return (
    <div className="overflow-hidden relative" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
      <motion.div
        className="flex items-center"
        animate={{ x: direction === 1 ? [-totalW, 0] : [0, -totalW] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <IntegrationPill key={i} name={item.name} color={item.color} />
        ))}
      </motion.div>
    </div>
  );
};

/* ─── MAIN COMPONENT ───────────────────────────────────── */
const About = () => (
  <section id="about" className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 -z-10" style={{ background:"radial-gradient(ellipse 60% 40% at 20% 20%,rgba(10,186,181,0.06) 0%,transparent 60%)" }}/>
    <div className="absolute inset-0 -z-10" style={{ background:"radial-gradient(ellipse 50% 50% at 80% 70%,rgba(196,77,255,0.06) 0%,transparent 70%)" }}/>

    <div className="max-w-7xl mx-auto space-y-32">

      {/* ── SECTION 1 ── */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div initial={{ opacity:0,x:-40 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6" style={{ background:"rgba(10,186,181,0.08)",border:"1px solid rgba(10,186,181,0.2)" }}>
            <Sparkles size={12} color="#0ABAB5"/>
            <span style={{ fontSize:11,color:"#0ABAB5",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase" }}>Our story</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight">
            Making knowledge <span className="gradient-text-hero">visible</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4 text-base">
             QuantiraViz was born from a simple frustration: the world’s knowledge is trapped in linear documents. We believe true understanding comes from seeing connections, not just reading pages.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base">
           Our mission is to make every piece of knowledge explorable, shareable, and visually clear. Built by a team of designers, researchers, and lifelong learners who believe the future of understanding is interactive and visual.
          </p>
        </motion.div>
        <motion.div initial={{ opacity:0,x:40 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.6,delay:0.1 }}>
          <ParallaxImageCard/>
        </motion.div>
      </div>

      {/* ── SECTION 3 ── */}
      <div className="grid lg:grid-cols-5 gap-6 items-stretch">
        <motion.div className="lg:col-span-3 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between"
          style={{ backgroundImage:`url('/images/our Vision.png')`, backgroundSize:"cover", backgroundPosition:"center", border:"1px solid rgba(10,186,181,0.18)", minHeight:280 }}
          initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full -z-0" style={{ background:"radial-gradient(circle,rgba(10,186,181,0.12) 0%,transparent 70%)",transform:"translate(30%,-30%)" }}/>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} color="#0ABAB5"/>
              <span style={{ fontSize:11,color:"#0ABAB5",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase" }}>Our vision</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl mb-3 leading-snug">
              A world where complex knowledge is instantly understandable by anyone
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We imagine a future where you can paste any document, any link, any idea — and in seconds see a living map of how everything connects. No expertise required. Just curiosity.
            </p>
          </div>
          <div className="relative z-10 mt-6 pt-6" style={{ borderTop:"1px solid rgba(10,186,181,0.15)" }}>
            <p className="text-xs text-muted-foreground">Founded in San Francisco · Remote-first globally</p>
          </div>
        </motion.div>
        <div className="lg:col-span-2 flex flex-col gap-4">
          <motion.div className="rounded-3xl p-6 flex flex-col gap-3 relative overflow-hidden"
            style={{ backgroundImage:`url('/images/mission.png')`, backgroundSize:"cover", backgroundPosition:"center", border:"1px solid rgba(196,77,255,0.18)",flex:1 }}
            initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}>
            <div className="flex items-center gap-2">
              <span style={{ width:8,height:8,borderRadius:"50%",background:"#c44dff",display:"inline-block",boxShadow:"0 0 8px rgba(196,77,255,0.6)" }}/>
              <span style={{ fontSize:11,color:"#c44dff",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase" }}>Our mission</span>
            </div>
            <p className="font-display font-semibold text-base leading-snug">Build AI tools that transform how humans learn, research, and collaborate.</p>
          </motion.div>
          <motion.div className="rounded-3xl p-6 relative overflow-hidden"
            style={{ backgroundImage:`url('/images/belief.png')`, backgroundSize:"cover", backgroundPosition:"center", border:"1px solid rgba(255,107,157,0.18)",flex:1 }}
            initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:0.2 }}>
            <div className="flex items-center gap-2 mb-2">
              <span style={{ width:8,height:8,borderRadius:"50%",background:"#ff6b9d",display:"inline-block",boxShadow:"0 0 8px rgba(255,107,157,0.6)" }}/>
              <span style={{ fontSize:11,color:"#ff6b9d",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase" }}>Our belief</span>
            </div>
            <p className="font-display font-semibold text-base leading-snug">Understanding comes from seeing connections — not reading pages.</p>
          </motion.div>
        </div>
      </div>

      {/* ── SECTION 5 — ZIGZAG TIMELINE ── */}
      <div className="" style={{ backgroundImage:`url('/images/journey.png')`, backgroundSize:"cover", backgroundPosition:"center", }}>
        <motion.div className="mb-16 text-center"
          initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div className="w-2 h-2 rounded-full" style={{ background:TEAL }}
              animate={{ scale:[1,1.7,1],opacity:[1,0.25,1] }} transition={{ duration:2,repeat:Infinity }}/>
            <span className="text-xs font-mono tracking-widest" style={{ color:TEAL }}>OUR STORY</span>
            <div className="h-px w-16" style={{ background:`linear-gradient(90deg,${TEAL}60,transparent)` }}/>
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl mb-2">
            The <span className="gradient-text">journey</span> so far
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">From a whiteboard idea to a global platform.</p>
        </motion.div>
        <div className="relative max-w-5xl mx-auto">
          <div className="hidden sm:block"><Spine/></div>
          <div className="flex flex-col gap-12 relative" style={{ zIndex:1 }}>
            <div className="flex flex-col gap-5 sm:hidden">
              {milestones.map((m,i)=>(
                <motion.div key={i} className="relative overflow-hidden rounded-2xl p-5"
                  style={{ background:`linear-gradient(135deg,#0d1117 0%,${m.color}0d 100%)`,border:`1px solid ${m.color}28` }}
                  initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}>
                  <NeuralDeco color={m.color}/>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <DiamondNode color={m.color} num={m.num}/>
                      <div>
                        <p className="font-mono text-xs" style={{ color:`${m.color}75` }}>{m.year}</p>
                        <span className="text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5" style={{ color:m.color,background:`${m.color}12`,border:`1px solid ${m.color}30` }}>{m.tag}</span>
                      </div>
                    </div>
                    <h4 className="font-display font-bold text-base mb-1.5 uppercase tracking-wide">{m.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="hidden sm:flex flex-col gap-12">
              {milestones.map((m,i)=><ZigzagRow key={i} m={m} index={i}/>)}
            </div>
          </div>
          <motion.div className="flex justify-center mt-10"
            initial={{ opacity:0,scale:0 }} whileInView={{ opacity:1,scale:1 }} viewport={{ once:true }} transition={{ delay:0.9,duration:0.4 }}>
            <div className="flex items-center gap-2 px-5 py-2.5 font-mono text-xs font-bold tracking-widest"
              style={{ background:`linear-gradient(135deg,${TEAL}18,${PURPLE}12)`,border:`1px solid ${TEAL}35`,color:TEAL,clipPath:"polygon(12px 0,100% 0,calc(100% - 12px) 100%,0 100%)",boxShadow:`0 0 24px ${TEAL}18` }}>
              <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background:TEAL }}
                animate={{ opacity:[1,0.2,1],scale:[1,1.5,1] }} transition={{ duration:1.5,repeat:Infinity }}/>
              AND GROWING
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SECTION 7 — HORIZONTAL SCROLLING MARQUEE
      ══════════════════════════════════════════════════ */}
      <motion.div
        className="relative overflow-hidden rounded-3xl py-12"
        style={{
          background: `linear-gradient(135deg, #0d1117 0%, ${TEAL}08 50%, ${PURPLE}06 100%)`,
          border: `1px solid ${TEAL}20`,
          boxShadow: `0 0 60px ${TEAL}08`,
        }}
        initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
      >
        {/* ambient corner glows */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background:`radial-gradient(circle,${TEAL}12,transparent 70%)`,transform:"translate(-30%,-30%)" }}/>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background:`radial-gradient(circle,${PURPLE}10,transparent 70%)`,transform:"translate(30%,30%)" }}/>

        {/* heading */}
        <motion.div className="text-center mb-10 px-6"
          initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div className="w-2 h-2 rounded-full" style={{ background:TEAL }}
              animate={{ scale:[1,1.6,1],opacity:[1,0.3,1] }} transition={{ duration:2,repeat:Infinity }}/>
            <span className="text-xs font-mono tracking-widest" style={{ color:TEAL }}>INTEGRATIONS</span>
            <div className="h-px w-16" style={{ background:`linear-gradient(90deg,${TEAL}60,transparent)` }}/>
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl mb-2">
            Works with your <span className="gradient-text">entire stack</span>
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Connect QuantiraViz to the tools your team already uses. Zero friction.
          </p>
        </motion.div>

        {/* Row 1 — scrolls left → right */}
        <div className="mb-4">
          <MarqueeRow items={integrations} direction={1} speed={38} />
        </div>

        {/* Row 2 — scrolls right → left (offset items for variety) */}
        <div>
          <MarqueeRow items={[...integrations.slice(4), ...integrations.slice(0, 4)]} direction={-1} speed={42} />
        </div>

        {/* bottom count */}
        <p className="text-center text-xs font-mono mt-8 px-6" style={{ color:`${TEAL}50` }}>
          + 40 MORE INTEGRATIONS VIA ZAPIER AND API
        </p>

        {/* bottom divider line */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background:`linear-gradient(90deg,transparent,${TEAL}40,${PURPLE}30,transparent)` }}/>
      </motion.div>

    </div>
  </section>
);

export default About;