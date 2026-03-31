import { motion } from "framer-motion";
import {
  Brain, Users, ZoomIn, Search, FileInput,
  FileOutput, Palette, LineChart, History,
} from "lucide-react";

const TEAL = "#0a8f8c";
const PURPLE = "#9a3fca";
const BG = "#0c0f12";

const features = [
  { icon: Users,      title: "Real-time Collaboration",  desc: "Work together on the same map with live cursors and edits across your entire team.",                                                          color: PURPLE, tag: "LIVE"   },
  { icon: ZoomIn,     title: "Infinite Zoom Canvas",     desc: "Dive deeper into any node with fractal-like zoom levels, infinitely deep.",                                                                   color: TEAL,   tag: "CANVAS" },
  { icon: Search,     title: "Smart Search",             desc: "Find any concept across all your maps in milliseconds with AI-powered search.",                                                               color: PURPLE, tag: "AI"     },
  { icon: FileInput,  title: "Import Anything",          desc: "PDFs, URLs, Notion, Slack, Google Docs — we handle it all seamlessly.",                                                                      color: TEAL,   tag: "SYNC"   },
  { icon: FileOutput, title: "Export Everywhere",        desc: "Figma, PDF, PNG, Markdown, or embed live maps anywhere you need.",                                                                           color: PURPLE, tag: "OUT"    },
  { icon: Palette,    title: "Custom Themes",            desc: "Match your brand with fully customizable visual styles and color schemes.",                                                                   color: TEAL,   tag: "STYLE"  },
  { icon: LineChart,  title: "AI Insights",              desc: "Get summaries, gap analysis, and smart suggestions generated from your maps.",                                                               color: PURPLE, tag: "INTEL"  },
 
];

/* ── ROW HEIGHT must match the rendered card height ── */
const ROW_H = 88;   // px — approximate height of each feature row including gap
const GAP    = 12;  // px — gap between rows
const TOTAL  = features.length * ROW_H + (features.length - 1) * GAP;
const HUB_D  = 180; // hub circle diameter

const HubCircle = () => (
  <div
    className="relative flex items-center justify-center flex-shrink-0"
    style={{ width: HUB_D, height: HUB_D }}
  >
    {/* rotating outer dashed ring */}
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ border: `1.5px dashed ${TEAL}35` }}
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    />
    {/* counter-rotating middle ring */}
    <motion.div
      className="absolute rounded-full"
      style={{ inset: 16, border: `1px solid ${TEAL}20` }}
      animate={{ rotate: -360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
    {/* static inner ring */}
    <div
      className="absolute rounded-full"
      style={{
        inset: 32,
        border: `1px solid ${TEAL}50`,
        boxShadow: `0 0 24px ${TEAL}20, inset 0 0 20px ${TEAL}08`,
      }}
    />

    {/* orbit dots */}
    {[
      { color: TEAL,   top: 8,          left: "50%",    mt: 0,    ml: -4   },
      { color: PURPLE, right: 8,        top: "50%",     mt: -3.5, ml: 0    },
      { color: TEAL,   bottom: 10,      left: "50%",    mt: 0,    ml: -3   },
    ].map((d, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: 8, height: 8,
          background: d.color,
          boxShadow: `0 0 10px ${d.color}`,
          top: d.top, right: d.right, bottom: d.bottom,
          left: d.left, marginTop: d.mt, marginLeft: d.ml,
        }}
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
      />
    ))}
<img src="/images/Everything you need to map knowledge.webp" alt="Knowledge Core" className="w-36 h-36 object-contain relative z-10" />
    {/* centre badge */}
    {/* <motion.div
      className="relative z-10 flex flex-col items-center justify-center rounded-full text-center"
      style={{
        width: 86, height: 86,
        background: `radial-gradient(circle, ${TEAL}18 0%, ${BG} 80%)`,
        border: `1px solid ${TEAL}55`,
      }}
      animate={{ boxShadow: [`0 0 18px ${TEAL}20`, `0 0 36px ${TEAL}38`, `0 0 18px ${TEAL}20`] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
     
    </motion.div> */}
  </div>
);

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => (
  <motion.div
    className="flex items-center gap-3 flex-1"
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.45 }}
  >
    {/* card */}
    <motion.div
      className="flex-1 flex items-center gap-4 rounded-xl px-5 py-4 cursor-default"
      style={{
        background: `linear-gradient(120deg, ${BG} 0%, ${feature.color}07 100%)`,
        border: `1px solid ${feature.color}22`,
      }}
      whileHover={{
        borderColor: `${feature.color}60`,
        x: 6,
        boxShadow: `0 4px 28px ${feature.color}14`,
        transition: { duration: 0.18 },
      }}
    >
      {/* icon */}
      <motion.div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: `${feature.color}12`,
          border: `1px solid ${feature.color}35`,
          boxShadow: `0 0 14px ${feature.color}15`,
        }}
        whileHover={{ scale: 1.12, rotate: 8, transition: { type: "spring", stiffness: 300 } }}
      >
        <feature.icon className="w-4 h-4" style={{ color: feature.color }} />
      </motion.div>

      {/* text */}
      <div className="flex-1 min-w-0">
        <span className="text-[9px] font-mono font-bold tracking-widest block mb-0.5" style={{ color: `${feature.color}70` }}>
          {feature.tag}
        </span>
        <h3 className="font-display font-semibold text-sm mb-0.5">{feature.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
      </div>

      {/* pulse dot */}
      <motion.div
        className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
        style={{ background: feature.color }}
        animate={{ opacity: [1, 0.15, 1], scale: [1, 1.5, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.2 }}
      />
    </motion.div>
  </motion.div>
);

const Features = () => (
  <section id="features" className="section-padding relative overflow-hidden">
    {/* ambient glows */}
    <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10" style={{ background: `${PURPLE}10` }} />
    <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl -z-10" style={{ background: `${TEAL}08` }} />

    <div className="max-w-7xl mx-auto">
      {/* heading */}
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: TEAL }}
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-mono tracking-widest" style={{ color: TEAL }}>CAPABILITIES</span>
          <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${TEAL}60, transparent)` }} />
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
          Everything you need to <span className="gradient-text">map knowledge</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl"> Intuitive features that simplify complex information.</p>
      </motion.div>

      {/* ── MAIN LAYOUT ── */}
      <div className="hidden lg:flex items-stretch gap-0">

        {/* ── LEFT: hub circle, vertically centred ── */}
        <motion.div
          className="flex-shrink-0 flex items-center"
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
        >
          <HubCircle />
        </motion.div>

        {/* ── CONNECTOR COLUMN: vertical spine + horizontal branches ── */}
        <div className="flex-shrink-0 relative" style={{ width: 64 }}>
          {/* vertical spine */}
          <motion.div
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: 0,
              background: `linear-gradient(180deg, transparent 0%, ${TEAL}60 8%, ${PURPLE}50 50%, ${TEAL}40 92%, transparent 100%)`,
            }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* horizontal branch lines — one per feature row */}
          {features.map((f, i) => {
            // each row occupies (ROW_H + GAP) px; centre of row i:
            const rowCentre = i * (ROW_H + GAP) + ROW_H / 2;
            // fraction of total height
            const topPct = (rowCentre / (features.length * (ROW_H + GAP) - GAP)) * 100;
            return (
              <motion.div
                key={i}
                className="absolute h-px"
                style={{
                  left: 0,
                  top: `${topPct}%`,
                  width: 64,
                  background: `linear-gradient(90deg, ${f.color}60, ${f.color}20)`,
                  transformOrigin: "left center",
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 + 0.4, duration: 0.3 }}
              />
            );
          })}

          {/* node dots on spine */}
          {features.map((f, i) => {
            const rowCentre = i * (ROW_H + GAP) + ROW_H / 2;
            const topPct = (rowCentre / (features.length * (ROW_H + GAP) - GAP)) * 100;
            return (
              <motion.div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: 0,
                  top: `${topPct}%`,
                  border: `2px solid ${f.color}`,
                  background: BG,
                  boxShadow: `0 0 8px ${f.color}70`,
                }}
                animate={{ boxShadow: [`0 0 5px ${f.color}40`, `0 0 14px ${f.color}90`, `0 0 5px ${f.color}40`] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.22 }}
              />
            );
          })}
        </div>

        {/* ── RIGHT: feature cards stacked ── */}
        <div className="flex-1 flex flex-col" style={{ gap: GAP }}>
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>

      {/* ── MOBILE: simple stacked cards ── */}
      <div className="flex flex-col gap-3 lg:hidden">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-4 rounded-xl px-5 py-4 cursor-default"
            style={{
              background: `linear-gradient(120deg, ${BG} 0%, ${feature.color}07 100%)`,
              border: `1px solid ${feature.color}22`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ borderColor: `${feature.color}55`, x: 4 }}
          >
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${feature.color}12`, border: `1px solid ${feature.color}35` }}
            >
              <feature.icon className="w-4 h-4" style={{ color: feature.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-mono font-bold tracking-widest block mb-0.5" style={{ color: `${feature.color}70` }}>
                {feature.tag}
              </span>
              <h3 className="font-display font-semibold text-sm mb-0.5">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
