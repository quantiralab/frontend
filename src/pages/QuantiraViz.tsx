import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  ExternalLink,
  FileText,
  Layers3,
  Lightbulb,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TEAL = "#0ABAB5";
const PURPLE = "#9a3fca";
const PINK = "#ff6b9d";

const highlights = [
  {
    icon: FileText,
    title: "Understand messy information quickly",
    description:
      "Bring in PDFs, URLs, notes, or long reports and turn scattered material into a visual story your team can actually follow.",
    color: TEAL,
  },
  {
    icon: Network,
    title: "Reveal the connections that matter",
    description:
      "QuantiraViz links ideas, themes, and evidence together so the important relationships stand out without manual sorting.",
    color: PURPLE,
  },
  {
    icon: Lightbulb,
    title: "Move from reading to decision-making",
    description:
      "Instead of leaving with another pile of summaries, you leave with direction, shared context, and next-best questions.",
    color: PINK,
  },
];

const journey = [
  {
    step: "01",
    title: "Bring in the source material",
    description:
      "Upload documents, paste links, or collect internal notes in one place so your research no longer lives across tabs and folders.",
  },
  {
    step: "02",
    title: "Let the map take shape",
    description:
      "QuantiraViz identifies the main concepts, recurring themes, and supporting signals, then arranges them into a clean visual structure.",
  },
  {
    step: "03",
    title: "Explore clusters and ask better questions",
    description:
      "Zoom into promising areas, trace relationships, and use AI-generated summaries to understand what each cluster is really saying.",
  },
  {
    step: "04",
    title: "Share clarity with the team",
    description:
      "Give stakeholders a single, explorable view of the work so decisions happen faster and with more confidence.",
  },
];

const useCases = [
  {
    icon: Search,
    title: "Research reviews",
    description:
      "Turn literature, market scans, and background reading into a connected landscape of themes, insights, and open questions.",
  },
  {
    icon: Users,
    title: "Team alignment",
    description:
      "Keep everyone on the same page with a living visual source of truth instead of fragmented documents and disconnected updates.",
  },
  {
    icon: Wand2,
    title: "Insight generation",
    description:
      "Summarize a node, a cluster, or an emerging storyline in seconds when you need a quick readout for leadership or clients.",
  },
  {
    icon: Brain,
    title: "Concept discovery",
    description:
      "Spot recurring ideas, hidden themes, and surprising relationships that are easy to miss when reading line by line.",
  },
  {
    icon: Layers3,
    title: "Knowledge organization",
    description:
      "Replace static note piles with a structured map that stays easy to browse as the project grows.",
  },
  {
    icon: ShieldCheck,
    title: "Decision support",
    description:
      "Walk into planning sessions, reviews, and strategy conversations with a clearer picture of what the material is actually saying.",
  },
];

const foundation = [
  {
    eyebrow: "Understanding engine",
    title: "NVIDIA NeMo Framework",
    description:
      "Used to help QuantiraViz read unstructured documents, deduce key concepts, and generate crisp summaries and semantic insights.",
    color: TEAL,
  },
  {
    eyebrow: "Connection engine",
    title: "NVIDIA RAPIDS (cuGraph)",
    description:
      "Supports the graph layer that assembles concepts into a knowledge map and highlights clusters or hidden relationships worth exploring.",
    color: PURPLE,
  },
  {
    eyebrow: "Delivery engine",
    title: "NVIDIA Triton Inference Server",
    description:
      "Keeps the language and graph workflows responsive behind the scenes so the experience stays smooth as usage scales.",
    color: PINK,
  },
];

const QuantiraViz = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="overflow-hidden">
        <section className="relative pt-32 pb-16 lg:pb-24">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 45% at 20% 20%, rgba(10,186,181,0.12) 0%, transparent 65%), radial-gradient(ellipse 45% 40% at 80% 18%, rgba(196,77,255,0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 45% at 50% 90%, rgba(255,107,157,0.07) 0%, transparent 70%)",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{
                  background: "rgba(10,186,181,0.08)",
                  border: "1px solid rgba(10,186,181,0.22)",
                }}
              >
                <Sparkles size={13} color={TEAL} />
                <span
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: TEAL }}
                >
                  QuantiraLab product spotlight
                </span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-5">
                Meet <span className="gradient-text">QuantiraViz</span>
                <br />
                the faster way to make sense of complex information
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
                QuantiraViz helps teams turn dense documents, research collections, and scattered notes into an explorable knowledge map. It is built for moments when you need more than a summary — you need to understand the landscape, see what connects, and act with confidence.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <motion.a
                  href="https://app.quantiralab.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gradient inline-flex items-center gap-2 text-base px-7 py-3.5"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(10,186,181,0.45)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Open QuantiraViz
                  <ExternalLink size={16} strokeWidth={2.3} />
                </motion.a>

                <motion.a
                  href="/#features"
                  className="btn-outline-glow inline-flex items-center gap-2 text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  See how it fits the platform
                  <ArrowRight size={16} strokeWidth={2.3} />
                </motion.a>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "Built for deep reading",
                  "Designed for collaboration",
                  "Made for insight-heavy work",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.72)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] blur-3xl -z-10" style={{ background: "rgba(10,186,181,0.08)" }} />

              <div
                className="glass-card p-5 sm:p-6 rounded-[1.75rem]"
                style={{ background: "linear-gradient(135deg, rgba(15,20,26,0.86) 0%, rgba(13,17,22,0.78) 100%)" }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-sm font-semibold">A clearer view of your knowledge</p>
                    <p className="text-xs text-muted-foreground">From source material to structured understanding</p>
                  </div>
                  <div
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.16em] uppercase"
                    style={{
                      background: "rgba(10,186,181,0.12)",
                      border: "1px solid rgba(10,186,181,0.28)",
                      color: TEAL,
                    }}
                  >
                    Live product
                  </div>
                </div>

                <div className="grid gap-3 mb-4">
                  {[
                    "PDF reports and whitepapers",
                    "Research links and source URLs",
                    "Meeting notes and internal docs",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-xl px-4 py-3"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${index === 1 ? "rgba(196,77,255,0.24)" : "rgba(10,186,181,0.18)"}`,
                      }}
                    >
                      <p className="text-xs text-muted-foreground">Input</p>
                      <p className="text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-xs uppercase tracking-[0.16em] mb-2" style={{ color: PURPLE }}>
                    What QuantiraViz surfaces
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    <li>• Key concepts that keep recurring across your material</li>
                    <li>• Relationships and clusters that deserve attention</li>
                    <li>• Simple summaries for each area of the map</li>
                    <li>• A faster path from reading to aligned decisions</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-padding pt-8 lg:pt-10 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="mb-12 max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: TEAL }} />
                <span className="text-xs font-mono tracking-widest" style={{ color: TEAL }}>
                  WHY IT STANDS OUT
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
                Built for people who need <span className="gradient-text">clarity, not clutter</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                QuantiraViz feels native to the way modern teams already work: gather material, find the important patterns, align around the same picture, and move forward.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="glass-card p-6"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  whileHover={{ y: -4, borderColor: `${item.color}55` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `${item.color}14`,
                      border: `1px solid ${item.color}35`,
                    }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl -z-10" style={{ background: "rgba(196,77,255,0.08)" }} />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: PURPLE }} />
                <span className="text-xs font-mono tracking-widest" style={{ color: PURPLE }}>
                  EXPERIENCE FLOW
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
                A simple journey from <span className="gradient-text-pink">input to insight</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                The product is designed to feel intuitive from the first upload. You do not need to engineer the process — you just bring the material and start exploring.
              </p>
            </motion.div>

            <div className="space-y-4">
              {journey.map((item, index) => (
                <motion.div
                  key={item.step}
                  className="rounded-2xl p-5 sm:p-6"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${index % 2 === 0 ? "rgba(10,186,181,0.2)" : "rgba(196,77,255,0.2)"}`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                      style={{
                        background: index % 2 === 0 ? "rgba(10,186,181,0.12)" : "rgba(196,77,255,0.12)",
                        color: index % 2 === 0 ? TEAL : PURPLE,
                        border: `1px solid ${index % 2 === 0 ? "rgba(10,186,181,0.3)" : "rgba(196,77,255,0.3)"}`,
                      }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-1.5">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="mb-12 max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: PINK }} />
                <span className="text-xs font-mono tracking-widest" style={{ color: PINK }}>
                  PRODUCT USES
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
                More ways teams can use <span className="gradient-text">QuantiraViz every day</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                It is especially valuable wherever people are reading a lot, comparing a lot, or trying to uncover the story hidden inside complex source material.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
              {useCases.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="rounded-2xl p-5 sm:p-6"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(10,186,181,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  whileHover={{ y: -4, borderColor: "rgba(10,186,181,0.28)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(10,186,181,0.12)", border: "1px solid rgba(10,186,181,0.26)" }}>
                    <item.icon className="w-4 h-4" style={{ color: index % 2 === 0 ? TEAL : PURPLE }} />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl -z-10" style={{ background: "rgba(10,186,181,0.08)" }} />
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="mb-10 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: TEAL }} />
                <span className="text-xs font-mono tracking-widest" style={{ color: TEAL }}>
                  UNDER THE HOOD
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
                Quietly powered by a strong <span className="gradient-text">AI foundation</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The technical layer stays in the background, but it is what makes the product useful: understanding documents, surfacing relationships, and keeping the experience responsive at scale.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-4 lg:gap-5">
              {foundation.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="glass-card p-6"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  whileHover={{ y: -4, borderColor: `${item.color}50` }}
                >
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: item.color }}>
                    {item.eyebrow}
                  </p>
                  <h3 className="font-display font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding pt-0">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="rounded-[2rem] p-8 sm:p-10 lg:p-12 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(10,186,181,0.08) 0%, rgba(196,77,255,0.08) 100%)",
                border: "1px solid rgba(10,186,181,0.2)",
                boxShadow: "0 0 40px rgba(10,186,181,0.08)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
                Ready to explore <span className="gradient-text">QuantiraViz</span> live?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-7 leading-relaxed">
                Open the product, bring in your material, and see how quickly complex information becomes easier to navigate, explain, and share.
              </p>
              <motion.a
                href="https://app.quantiralab.com"
                target="_blank"
                rel="noreferrer"
                className="btn-gradient inline-flex items-center gap-2 text-base px-7 py-3.5"
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(10,186,181,0.45)" }}
                whileTap={{ scale: 0.98 }}
              >
                Launch QuantiraViz
                <ExternalLink size={16} strokeWidth={2.3} />
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default QuantiraViz;
