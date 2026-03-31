import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ArrowRight, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    tag: "Get started",
    price: { monthly: 0, annual: 0 },
    desc: "Everything you need to explore KnoViz and map your first ideas.",
    features: [
      "3 knowledge maps",
      "Basic AI mapping",
      "PNG export",
      "Community support",
    ],
    cta: "Get started free",
    popular: false,
    accent: "#56DFCF",
    accentDim: "rgba(86,223,207,0.1)",
    accentBorder: "rgba(86,223,207,0.2)",
  },
  {
    name: "Pro",
    tag: "Most popular",
    price: { monthly: 19, annual: 15 },
    desc: "Unlimited maps, advanced AI insights, and real-time collaboration for professionals.",
    features: [
      "Unlimited maps",
      "Advanced AI + insights",
      "All export formats",
      "Real-time collaboration",
      "Version history",
      "Priority support",
    ],
    cta: "Start Pro trial",
    popular: true,
    accent: "#0ABAB5",
    accentDim: "rgba(10,186,181,0.1)",
    accentBorder: "rgba(10,186,181,0.3)",
  },
  {
    name: "Enterprise",
    tag: "Custom",
    price: { monthly: null, annual: null },
    desc: "Tailored solutions with SSO, admin controls, and dedicated support at any scale.",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Admin console",
      "Custom integrations",
      "Dedicated CSM",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    popular: false,
    accent: "#c44dff",
    accentDim: "rgba(196,77,255,0.1)",
    accentBorder: "rgba(196,77,255,0.2)",
  },
];

const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">

      {/* Background glows */}
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 55% 45% at 50% 20%, rgba(196,77,255,0.07) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 40% 40% at 10% 80%, rgba(10,186,181,0.06) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 35% 35% at 90% 70%, rgba(86,223,207,0.05) 0%, transparent 60%)" }} />

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
            style={{ background: "rgba(196,77,255,0.08)", border: "1px solid rgba(196,77,255,0.2)" }}
          >
            <Sparkles size={12} color="#c44dff" />
            <span style={{ fontSize: 11, color: "#c44dff", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Pricing</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Simple, transparent{" "}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Start free. Upgrade when you're ready. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <span className={`text-sm font-medium transition-colors ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{ background: annual ? "rgba(10,186,181,0.3)" : "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full"
                animate={{ left: annual ? 26 : 2 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                style={{ background: annual ? "#0ABAB5" : "rgba(255,255,255,0.5)", boxShadow: annual ? "0 0 10px rgba(10,186,181,0.6)" : "none" }}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${annual ? "text-foreground" : "text-muted-foreground"}`}>
              Annual{" "}
              <span style={{ color: "#56DFCF", fontSize: 11, fontWeight: 700 }}>−20%</span>
            </span>
          </div>
        </motion.div>

        {/* ── Horizontal cards ── */}
        <div className="flex flex-col gap-4">
          {plans.map((plan, i) => {
            const isHovered = hovered === i;
            const price = annual ? plan.price.annual : plan.price.monthly;

            return (
              <motion.div
                key={plan.name}
                className="relative rounded-2xl overflow-hidden cursor-default"
                style={{
                  border: plan.popular
                    ? `1px solid ${plan.accentBorder}`
                    : `1px solid rgba(255,255,255,${isHovered ? "0.12" : "0.06"})`,
                  background: plan.popular
                    ? `rgba(10,186,181,0.05)`
                    : `rgba(255,255,255,${isHovered ? "0.04" : "0.02"})`,
                  transition: "border-color 0.3s, background 0.3s",
                }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
              >
                {/* Popular glow strip top */}
                {plan.popular && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${plan.accent}, transparent)` }}
                  />
                )}

                <div className="grid lg:grid-cols-[200px_1fr_auto] items-center gap-0">

                  {/* Col 1: Plan identity */}
                  <div
                    className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r flex flex-col gap-2"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    {/* Tag badge */}
                    <div
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md self-start"
                      style={{ background: plan.accentDim, border: `1px solid ${plan.accentBorder}` }}
                    >
                      {plan.popular && <Zap size={10} style={{ color: plan.accent }} />}
                      <span style={{ fontSize: 10, color: plan.accent, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        {plan.tag}
                      </span>
                    </div>

                    <p className="font-display font-bold text-2xl">{plan.name}</p>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mt-1">
                      <AnimatePresence mode="wait">
                        {price !== null ? (
                          <motion.span
                            key={annual ? "annual" : "monthly"}
                            className="font-display font-bold text-3xl"
                            style={{ color: plan.accent }}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.2 }}
                          >
                            ${price}
                          </motion.span>
                        ) : (
                          <motion.span
                            key="custom"
                            className="font-display font-bold text-2xl"
                            style={{ color: plan.accent }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            Custom
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {price !== null && (
                        <span className="text-xs text-muted-foreground">/month</span>
                      )}
                    </div>

                    {annual && price !== null && price > 0 && (
                      <p className="text-xs" style={{ color: "#56DFCF" }}>
                        Billed ${price * 12}/year
                      </p>
                    )}
                  </div>

                  {/* Col 2: Description + features */}
                  <div
                    className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-sm">
                      {plan.desc}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: plan.accentDim, border: `1px solid ${plan.accentBorder}` }}
                          >
                            <Check size={9} style={{ color: plan.accent }} strokeWidth={3} />
                          </div>
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Col 3: CTA */}
                  <div className="p-6 lg:p-8 flex flex-col items-center justify-center gap-3 min-w-[180px]">
                    <motion.button
                      onClick={() => {
                        // Navigate to checkout for purchasable plans
                        if (plan.name === "Enterprise") {
                          // Enterprise leads to contact sales (open contact section)
                          const contactSection = document.getElementById("contact");
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: "smooth" });
                          }
                          return;
                        }
                        navigate(`/checkout?plan=${encodeURIComponent(plan.name)}&billing=${annual ? "annual" : "monthly"}`);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                      style={
                        plan.popular
                          ? { background: plan.accent, color: "#0a1a1a" }
                          : { background: plan.accentDim, border: `1px solid ${plan.accentBorder}`, color: plan.accent }
                      }
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {plan.cta}
                      <ArrowRight size={14} />
                    </motion.button>
                    {plan.name === "Free" && (
                      <p className="text-xs text-muted-foreground text-center">No credit card required</p>
                    )}
                    {plan.name === "Pro" && (
                      <p className="text-xs text-muted-foreground text-center">14-day free trial</p>
                    )}
                    {plan.name === "Enterprise" && (
                      <p className="text-xs text-muted-foreground text-center">Custom onboarding included</p>
                    )}
                  </div>
                </div>

                {/* Hover glow layer */}
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  animate={{ opacity: isHovered && !plan.popular ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: `radial-gradient(ellipse 60% 80% at 10% 50%, ${plan.accentDim} 0%, transparent 70%)` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom trust strip ── */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            "✦  Cancel anytime",
            "✦  No hidden fees",
            "✦  SOC 2 Type II",
            "✦  End-to-end encrypted",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1">
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;