import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, MessageCircleQuestion, Zap, Shield, Users, RefreshCcw, Code2, ChevronRight } from "lucide-react";

const TEAL   = "#0a8f8c";
const PURPLE = "#9a3fca";
const BG     = "#0c0f12";

const faqs = [
  {
    q: "What types of content can process?",
    a: "QuantiraViz handles PDFs, Word docs, web URLs, Notion pages, Slack threads, Google Docs, plain text, and more. If it's text, we can map it.",
    icon: Zap,
    color: TEAL,
    tag: "INGESTION",
  },
  {
    q: "How accurate is the AI mapping?",
    a: "Our AI uses NLP models fine-tuned for knowledge extraction. Accuracy is typically 90%+ for concept identification, and you can always refine manually.",
    icon: MessageCircleQuestion,
    color: PURPLE,
    tag: "AI CORE",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use end-to-end encryption, SOC 2 Type II compliance, and your data is never used to train our models.",
    icon: Shield,
    color: TEAL,
    tag: "SECURITY",
  },
  {
    q: "Can I collaborate with my team in real-time?",
    a: "Yes! Pro and Enterprise plans include real-time collaboration with live cursors, comments, and simultaneous editing across your entire knowledge graph.",
    icon: Users,
    color: PURPLE,
    tag: "COLLABORATION",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, cancel anytime. No lock-in contracts. Your maps remain accessible on the free plan with no data loss.",
    icon: RefreshCcw,
    color: TEAL,
    tag: "BILLING",
  },
  {
    q: "Do you offer an API?",
    a: "Yes, Pro and Enterprise plans include API access for programmatic map creation, embedding, and full integration into your own tools.",
    icon: Code2,
    color: PURPLE,
    tag: "DEVELOPER",
  },
];

/* ── Animated number counter ── */
const Counter = ({ value, color }: { value: number; color: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      className="font-mono text-xs font-bold"
      style={{ color }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 0.3 }}
    >
      {String(value).padStart(2, "0")}
    </motion.span>
  );
};

/* ── Single FAQ row ── */
const FAQItem = ({
  faq,
  index,
  isOpen,
  onClick,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onClick: () => void;
}) => {
  const Icon = faq.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        style={{
          background: isOpen
            ? `linear-gradient(135deg, ${faq.color}12, ${faq.color}06)`
            : `linear-gradient(135deg, #0d111700, #0d1117)`,
          border: `1px solid ${isOpen ? faq.color + "45" : faq.color + "18"}`,
          boxShadow: isOpen ? `0 0 32px ${faq.color}12, inset 0 0 24px ${faq.color}05` : "none",
          transition: "all 0.3s ease",
        }}
        onClick={onClick}
        whileHover={{
          borderColor: faq.color + "40",
          boxShadow: `0 0 20px ${faq.color}10`,
        }}
      >
        {/* left color bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
          style={{ background: faq.color }}
          animate={{ opacity: isOpen ? 1 : 0.3, scaleY: isOpen ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        />

        {/* scan line on open */}
        {isOpen && (
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${faq.color}40, transparent)` }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        )}

        <div className="pl-5 pr-5 py-5">
          {/* Question row */}
          <div className="flex items-center gap-4">
            {/* Icon box */}
            <motion.div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: `${faq.color}${isOpen ? "20" : "0e"}`,
                border: `1px solid ${faq.color}${isOpen ? "45" : "25"}`,
                boxShadow: isOpen ? `0 0 14px ${faq.color}30` : "none",
              }}
              animate={{ scale: isOpen ? 1.05 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <Icon size={15} style={{ color: faq.color }} />
            </motion.div>

            {/* Tag + question */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="text-[9px] font-mono font-bold tracking-widest"
                  style={{ color: `${faq.color}70` }}
                >
                  {faq.tag}
                </span>
                <Counter value={index + 1} color={`${faq.color}40`} />
              </div>
              <p
                className="font-display font-semibold text-sm leading-snug transition-colors duration-200"
                style={{ color: isOpen ? "#fff" : "rgba(255,255,255,0.65)" }}
              >
                {faq.q}
              </p>
            </div>

            {/* Toggle */}
            <motion.div
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                background: isOpen ? `${faq.color}20` : "transparent",
                border: `1px solid ${faq.color}${isOpen ? "50" : "25"}`,
                color: faq.color,
              }}
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <Plus size={12} strokeWidth={2.5} />
            </motion.div>
          </div>

          {/* Answer */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="mt-4 ml-14 pt-4"
                  style={{ borderTop: `1px solid ${faq.color}18` }}
                >
                  {/* terminal-style answer */}
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: `${faq.color}08`,
                      border: `1px solid ${faq.color}15`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="flex gap-1">
                        {[0.9, 0.5, 0.3].map((op, i) => (
                          <div key={i} className="w-2 h-2 rounded-full" style={{ background: faq.color, opacity: op }} />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono" style={{ color: `${faq.color}50` }}>
                        ANSWER.md
                      </span>
                    </div>
                    <motion.p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.60)" }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      <span style={{ color: `${faq.color}90` }}>→ </span>
                      {faq.a}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Side panel stat card ── */
const StatCard = ({
  value,
  label,
  color,
  delay,
}: {
  value: string;
  label: string;
  color: string;
  delay: number;
}) => (
  <motion.div
    className="rounded-2xl p-5"
    style={{
      background: `linear-gradient(135deg, ${color}12, ${color}05)`,
      border: `1px solid ${color}25`,
    }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ borderColor: `${color}50`, boxShadow: `0 0 20px ${color}15` }}
  >
    <motion.p
      className="font-display font-bold text-3xl mb-1"
      style={{ color, textShadow: `0 0 20px ${color}50` }}
      animate={{ textShadow: [`0 0 12px ${color}30`, `0 0 26px ${color}60`, `0 0 12px ${color}30`] }}
      transition={{ duration: 2.5, repeat: Infinity, delay }}
    >
      {value}
    </motion.p>
    <p className="text-xs font-mono tracking-widest" style={{ color: `${color}65` }}>{label}</p>
  </motion.div>
);

/* ── Main FAQ section ── */
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section 
      className="section-padding relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/faq.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 -z-10 pointer-events-none" />

      {/* ambient glows */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -z-10 pointer-events-none"
        style={{ background: `${TEAL}0a` }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl -z-10 pointer-events-none"
        style={{ background: `${PURPLE}0c` }} />

      {/* subtle grid bg */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(${TEAL} 1px, transparent 1px), linear-gradient(90deg, ${TEAL} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto">

        {/* ── HEADING ── */}
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
              animate={{ scale: [1, 1.7, 1], opacity: [1, 0.25, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-mono tracking-widest" style={{ color: TEAL }}>FAQ</span>
            <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${TEAL}60, transparent)` }} />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Frequently asked{" "}
            <span className="gradient-text">questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Everything you need to know about QuantiraViz. Can't find an answer?{" "}
            <span style={{ color: TEAL }}>Talk to our team.</span>
          </p>
        </motion.div>

        {/* ── TWO COLUMN LAYOUT ── */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* LEFT: FAQ list */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>

          {/* RIGHT: sticky side panel */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-4">

            {/* still have questions card */}
            <motion.div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${TEAL}18, ${PURPLE}12)`,
                border: `1px solid ${TEAL}35`,
                boxShadow: `0 0 40px ${TEAL}12`,
              }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${TEAL}22, transparent 70%)` }} />

              <motion.div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  background: `linear-gradient(135deg, ${TEAL}30, ${PURPLE}20)`,
                  border: `1px solid ${TEAL}45`,
                  boxShadow: `0 0 20px ${TEAL}30`,
                }}
                animate={{ boxShadow: [`0 0 14px ${TEAL}20`, `0 0 28px ${TEAL}45`, `0 0 14px ${TEAL}20`] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <MessageCircleQuestion size={20} style={{ color: TEAL }} />
              </motion.div>

              <p className="font-display font-bold text-lg mb-1">Still have questions?</p>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                Our team responds in under 2 hours on business days.
              </p>

              <motion.button
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${TEAL}, ${PURPLE})`,
                  color: "#fff",
                  boxShadow: `0 0 20px ${TEAL}35`,
                }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 32px ${TEAL}55` }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Talk to us
                <ChevronRight size={14} strokeWidth={2.5} />
              </motion.button>
            </motion.div>

            {/* stats */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard value="90%+"  label="AI ACCURACY"     color={TEAL}   delay={0.1} />
              <StatCard value="SOC2"  label="COMPLIANT"       color={PURPLE} delay={0.2} />
              <StatCard value="<2hr"  label="RESPONSE TIME"   color={PURPLE} delay={0.3} />
              <StatCard value="99.9%" label="UPTIME SLA"      color={TEAL}   delay={0.4} />
            </div>

            {/* open count indicator */}
            <motion.div
              className="rounded-xl px-4 py-3 flex items-center justify-between"
              style={{
                background: `${TEAL}08`,
                border: `1px solid ${TEAL}20`,
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-xs font-mono" style={{ color: `${TEAL}70` }}>
                {open !== null ? `VIEWING Q${String(open + 1).padStart(2, "0")}` : "SELECT A QUESTION"}
              </span>
              <div className="flex gap-1">
                {faqs.map((f, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full cursor-pointer"
                    style={{ background: open === i ? f.color : `${f.color}30` }}
                    animate={{ scale: open === i ? 1.3 : 1 }}
                    onClick={() => setOpen(open === i ? null : i)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;