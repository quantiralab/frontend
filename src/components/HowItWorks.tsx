import { motion } from "framer-motion";
import { Upload, Brain, GitBranch, Share2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Import Your Content",
    desc: "Upload documents, paste links, or connect apps. KnoViz ingests anything.",
    color: "#0a8f8c",
    badge: "LIVE",
    badgeColor: "#0a8f8c",
    position: "top-left",
  },
  {
    icon: Brain,
    title: "AI Analyzes & Maps",
    desc: "Our AI identifies key concepts, relationships, and hierarchies instantly.",
    color: "#0a8f8c",
    badge: "ACTIVE",
    badgeColor: "#0a8f8c",
    position: "top-right",
  },
  {
    icon: GitBranch,
    title: "Explore & Refine",
    desc: "Interact with your knowledge map — zoom, branch, collapse, and annotate.",
    color: "#9a3fca",
    badge: "SECURED",
    badgeColor: "#9a3fca",
    position: "bottom-left",
  },
  {
    icon: Share2,
    title: "Share & Collaborate",
    desc: "Export anywhere or invite your team to explore and build together.",
    color: "#9a3fca",
    badge: "SYNCED",
    badgeColor: "#9a3fca",
    position: "bottom-right",
  },
];

const NeuralCoreSVG = () => (
  <svg
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <defs>
      <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0a8f8c" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0a8f8c" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#9a3fca" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#9a3fca" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="brainGrad" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#9a3fca" />
        <stop offset="50%" stopColor="#6b2a9a" />
        <stop offset="100%" stopColor="#0a8f8c" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Outer ring glow */}
    <circle cx="150" cy="150" r="140" fill="url(#outerGlow)" />

    {/* Orbit rings */}
    <circle cx="150" cy="150" r="130" fill="none" stroke="#0a8f8c" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 6" />
    <circle cx="150" cy="150" r="100" fill="none" stroke="#9a3fca" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="3 5" />
    <circle cx="150" cy="150" r="70" fill="none" stroke="#0a8f8c" strokeWidth="0.5" strokeOpacity="0.3" />

    {/* Inner glow */}
    <circle cx="150" cy="150" r="65" fill="url(#innerGlow)" />

    {/* Brain silhouette (simplified) */}
    <g filter="url(#glow)">
      {/* Left hemisphere */}
      <path
        d="M150 105 C130 100, 110 110, 105 130 C100 150, 108 170, 120 178 C130 185, 140 183, 148 180 L150 175"
        fill="url(#brainGrad)"
        opacity="0.9"
      />
      {/* Right hemisphere */}
      <path
        d="M150 105 C170 100, 190 110, 195 130 C200 150, 192 170, 180 178 C170 185, 160 183, 152 180 L150 175"
        fill="url(#brainGrad)"
        opacity="0.9"
      />
      {/* Center divide */}
      <path
        d="M150 108 C148 130, 147 150, 148 178"
        fill="none"
        stroke="#0c0f12"
        strokeWidth="2"
        opacity="0.6"
      />
      {/* Brain folds */}
      <path d="M118 125 C122 120, 128 122, 130 128" fill="none" stroke="#0a8f8c" strokeWidth="1" opacity="0.7" />
      <path d="M112 140 C118 136, 124 138, 126 144" fill="none" stroke="#0a8f8c" strokeWidth="1" opacity="0.7" />
      <path d="M116 155 C122 151, 128 153, 129 159" fill="none" stroke="#0a8f8c" strokeWidth="1" opacity="0.6" />
      <path d="M182 125 C178 120, 172 122, 170 128" fill="none" stroke="#9a3fca" strokeWidth="1" opacity="0.7" />
      <path d="M188 140 C182 136, 176 138, 174 144" fill="none" stroke="#9a3fca" strokeWidth="1" opacity="0.7" />
      <path d="M184 155 C178 151, 172 153, 171 159" fill="none" stroke="#9a3fca" strokeWidth="1" opacity="0.6" />
    </g>

    {/* Orbiting dots */}
    <circle cx="150" cy="50" r="4" fill="#0a8f8c" opacity="0.8" filter="url(#glow)">
      <animateTransform attributeName="transform" type="rotate" from="0 150 150" to="360 150 150" dur="8s" repeatCount="indefinite" />
    </circle>
    <circle cx="280" cy="150" r="3" fill="#9a3fca" opacity="0.8" filter="url(#glow)">
      <animateTransform attributeName="transform" type="rotate" from="0 150 150" to="-360 150 150" dur="12s" repeatCount="indefinite" />
    </circle>
    <circle cx="150" cy="250" r="3.5" fill="#0a8f8c" opacity="0.7" filter="url(#glow)">
      <animateTransform attributeName="transform" type="rotate" from="90 150 150" to="450 150 150" dur="10s" repeatCount="indefinite" />
    </circle>

    {/* Label */}
    <text x="150" y="210" textAnchor="middle" fill="#0a8f8c" fontSize="8" letterSpacing="3" opacity="0.6" fontFamily="monospace">
      NEURAL_CORE_V6.0
    </text>
  </svg>
);

const Card = ({ step, index }: { step: (typeof steps)[0]; index: number }) => {
  const isRight = step.position.includes("right");
  const isBottom = step.position.includes("bottom");

  return (
    <motion.div
      className="relative glass-card p-5 lg:p-6 group hover:shadow-[var(--shadow-hover)] transition-all duration-300"
      style={{
        border: `1px solid ${step.color}22`,
        background: "rgba(12,15,18,0.85)",
        backdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0, x: isRight ? 40 : -40, y: isBottom ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: `0 0 30px ${step.color}22` }}
    >
      {/* Badge */}
      <div
        className="absolute top-3 right-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm"
        style={{
          color: step.badgeColor,
          border: `1px solid ${step.badgeColor}44`,
          background: `${step.badgeColor}11`,
        }}
      >
        {step.badge}
      </div>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: `linear-gradient(135deg, ${step.color}33, ${step.color}11)`,
          border: `1px solid ${step.color}44`,
          boxShadow: `0 0 16px ${step.color}33`,
        }}
      >
        <step.icon className="w-4 h-4" style={{ color: step.color }} />
      </div>

      {/* Step number watermark */}
      <span
        className="absolute bottom-3 right-4 text-5xl font-bold font-mono select-none pointer-events-none"
        style={{ color: step.color, opacity: 0.07 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="font-display font-semibold text-base mb-1.5">{step.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
    </motion.div>
  );
};

const HowItWorks = () => (
  <section id="how-it-works" className="section-padding relative overflow-hidden">
    {/* Background glows */}
    <div
      className="absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 30% 50%, rgba(10,143,140,0.07) 0%, transparent 70%)",
      }}
    />
    <div
      className="absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 40% 40% at 80% 60%, rgba(154,63,202,0.07) 0%, transparent 70%)",
      }}
    />

    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
         See <span className="gradient-text">how</span> It works 
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From raw information to visual insight in seconds.
        </p>
      </motion.div>

      {/* Hub-and-spoke layout */}
      <div className="relative">
        {/* Desktop: 3-column grid with center brain */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <Card step={steps[0]} index={0} />
            <Card step={steps[2]} index={2} />
          </div>

          {/* Center: Neural brain */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Connector lines SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ zIndex: 0 }}
            >
              {/* Top-left to center */}
              <line x1="0" y1="25" x2="50" y2="50" stroke="#0a8f8c" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="3 4" />
              {/* Bottom-left to center */}
              <line x1="0" y1="75" x2="50" y2="50" stroke="#9a3fca" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="3 4" />
              {/* Top-right to center */}
              <line x1="100" y1="25" x2="50" y2="50" stroke="#0a8f8c" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="3 4" />
              {/* Bottom-right to center */}
              <line x1="100" y1="75" x2="50" y2="50" stroke="#9a3fca" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="3 4" />
            </svg>

            {/* Brain graphic */}
            <div className="relative w-64 h-64 z-10">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background:
                    "radial-gradient(circle, rgba(154,63,202,0.15) 0%, rgba(10,143,140,0.1) 50%, transparent 70%)",
                }}
              />
              {/* <NeuralCoreSVG /> */}
              <img src="/images/How KnoViz Works.png" alt="Neural Core" className="w-72 h-68 object-contain" />
            </div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <Card step={steps[1]} index={1} />
            <Card step={steps[3]} index={3} />
          </div>
        </div>

        {/* Mobile: stacked grid */}
        <div className="grid sm:grid-cols-2 gap-5 lg:hidden">
          {/* Mobile center brain */}
          <motion.div
            className="sm:col-span-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-48 h-48 relative">
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background:
                    "radial-gradient(circle, rgba(154,63,202,0.15) 0%, rgba(10,143,140,0.1) 50%, transparent 70%)",
                }}
              />
              <NeuralCoreSVG />
            </div>
          </motion.div>
          {steps.map((step, i) => (
            <Card key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
