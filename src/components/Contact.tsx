import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CalendarDays,
  Mail,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  Zap,
} from "lucide-react";

/* ─── DATA ───────────────────────────────────────────── */
const channels = [
  {
    icon: CalendarDays,
    color: "#0ABAB5",
    bg: "rgba(10,186,181,0.10)",
    border: "rgba(10,186,181,0.22)",
    label: "Book a demo",
    desc: "30-min personalised walkthrough",
    action: "Schedule now",
  },
  {
    icon: Mail,
    color: "#c44dff",
    bg: "rgba(196,77,255,0.10)",
    border: "rgba(196,77,255,0.22)",
    label: "Email us",
    desc: "contact@quantiralab.com",
    action: "Send email",
  },
  {
    icon: MessageSquare,
    color: "#ff6b9d",
    bg: "rgba(255,107,157,0.10)",
    border: "rgba(255,107,157,0.22)",
    label: "Live chat",
    desc: "Usually replies in minutes",
    action: "Start chat",
  },
];

const meta = [
  { icon: MapPin, text: "1 Market St, San Francisco, CA 94105, United States" },
  { icon: Clock,  text: "Response within 24 hours" },
  { icon: Zap,    text: "Trusted by 150K+ users" },
];

const topics = ["General inquiry", "Request a demo", "Partnership", "Press & media", "Support"];

/* ─── COMPONENT ──────────────────────────────────────── */
const Contact = () => {
  const [sent, setSent] = useState(false);
  const [activeTopic, setActiveTopic] = useState("General inquiry");

  const RECAPTCHA_SITE_KEY = "6LeMgZgsAAAAAAp8d7W_8_hv7trefXu0rkwBMmyg";

  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Render v2 checkbox widget when grecaptcha is available.
    let mounted = true;
    const tryRender = () => {
      const grecaptcha = (window as any).grecaptcha;
      if (!mounted) return;
      if (grecaptcha && recaptchaRef.current && widgetIdRef.current === null) {
        try {
          widgetIdRef.current = grecaptcha.render(recaptchaRef.current, {
            sitekey: RECAPTCHA_SITE_KEY,
            theme: "light",
          });
        } catch (err) {
          // ignore
        }
      }
    };

    tryRender();
    const interval = setInterval(tryRender, 500);
    const timeout = setTimeout(() => clearInterval(interval), 8000);

    return () => {
      mounted = false;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const grecaptcha = (window as any).grecaptcha;
    if (!grecaptcha) {
      alert("reCAPTCHA not loaded. Please try again later.");
      return;
    }

    let response = "";
    try {
      if (widgetIdRef.current !== null) response = grecaptcha.getResponse(widgetIdRef.current);
      else response = grecaptcha.getResponse();
    } catch (err) {
      response = grecaptcha.getResponse();
    }

    if (!response) {
      alert("Please complete the reCAPTCHA to submit the form.");
      return;
    }

    // Get form data
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    // Add the selected topic
    formData.append("topic", activeTopic);

    try {
      // Send to Formspree
      const response = await fetch("https://formspree.io/f/mgopvlgl", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSent(true);
        try {
          if (widgetIdRef.current !== null) grecaptcha.reset(widgetIdRef.current);
          else grecaptcha.reset();
        } catch (err) {
          // ignore
        }
      } else {
        alert("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">

      {/* Background atmosphere */}
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 55% 55% at 15% 50%, rgba(10,186,181,0.15) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 45% 45% at 85% 40%, rgba(196,77,255,0.12) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 35% 35% at 50% 90%, rgba(255,107,157,0.10) 0%, transparent 60%)" }} />

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
            style={{ background: "rgba(10,186,181,0.08)", border: "1px solid rgba(10,186,181,0.2)" }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0ABAB5", display: "inline-block", boxShadow: "0 0 8px #0ABAB5" }} />
            <span style={{ fontSize: 11, color: "#0ABAB5", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Let's talk
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Get in <span className="gradient-text-pink">touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Whether you want a demo, have a question, or just want to say hi — we're here and we'd love to hear from you.
          </p>
        </motion.div>

        {/* ── Channel cards row ── */}
        <motion.div
          className="grid sm:grid-cols-3 gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {channels.map((ch, i) => (
            <motion.div
              key={i}
              className="group cursor-pointer rounded-2xl p-5 flex items-start gap-4 transition-all duration-300"
              style={{ background: ch.bg, border: `1px solid ${ch.border}` }}
              whileHover={{ y: -3, borderColor: ch.color + "55" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: ch.bg, border: `1px solid ${ch.border}` }}
              >
                <ch.icon size={18} style={{ color: ch.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-sm mb-0.5">{ch.label}</p>
                <p className="text-xs text-muted-foreground mb-3">{ch.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: ch.color }}>
                  {ch.action}
                  <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main 2-col layout ── */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Left: info panel */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Vision blurb */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="font-display font-bold text-xl mb-3 leading-snug">
                We reply to every message — personally.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No support bots, no ticket queues. A real human from the KnoViz team will read your message and get back to you.
              </p>
            </div>

            {/* Meta info */}
            <div className="space-y-3">
              {meta.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(10,186,181,0.08)", border: "1px solid rgba(10,186,181,0.18)" }}
                  >
                    <Icon size={14} style={{ color: "#0ABAB5" }} />
                  </div>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>

            {/* Decorative node grid */}
            <div
              className="rounded-2xl p-5 overflow-hidden relative"
              style={{ background: "rgba(10,186,181,0.04)", border: "1px solid rgba(10,186,181,0.12)", minHeight: 120 }}
            >
              <svg width="100%" height="110" viewBox="0 0 300 110" fill="none">
                {/* Grid dots */}
                {Array.from({ length: 5 }).map((_, row) =>
                  Array.from({ length: 9 }).map((_, col) => (
                    <circle
                      key={`${row}-${col}`}
                      cx={20 + col * 32}
                      cy={15 + row * 20}
                      r={1.5}
                      fill="rgba(10,186,181,0.25)"
                    />
                  ))
                )}
                {/* Highlighted path */}
                <circle cx="84"  cy="35" r="5" fill="rgba(10,186,181,0.3)" stroke="#0ABAB5" strokeWidth="1.5" />
                <circle cx="84"  cy="35" r="2" fill="#0ABAB5" />
                <circle cx="180" cy="55" r="7" fill="rgba(10,186,181,0.2)" stroke="#0ABAB5" strokeWidth="1.5" />
                <circle cx="180" cy="55" r="3" fill="#0ABAB5" />
                <circle cx="244" cy="35" r="5" fill="rgba(196,77,255,0.3)" stroke="#c44dff" strokeWidth="1.5" />
                <circle cx="244" cy="35" r="2" fill="#c44dff" />
                <circle cx="52"  cy="75" r="4" fill="rgba(255,107,157,0.3)" stroke="#ff6b9d" strokeWidth="1.5" />
                <circle cx="52"  cy="75" r="2" fill="#ff6b9d" />
                <line x1="84" y1="35" x2="180" y2="55" stroke="#0ABAB5" strokeWidth="1" strokeDasharray="4 3" />
                <line x1="180" y1="55" x2="244" y2="35" stroke="#c44dff" strokeWidth="1" strokeDasharray="4 3" />
                <line x1="52"  y1="75" x2="180" y2="55" stroke="#ff6b9d" strokeWidth="1" strokeDasharray="4 3" />
              </svg>
              <p
                className="absolute bottom-3 right-4 font-mono"
                style={{ fontSize: 10, color: "rgba(10,186,181,0.5)" }}
              >
                knowledge graph
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="rounded-3xl p-7 sm:p-9 relative overflow-hidden"
              style={{ backgroundImage: "url('/images/Contact.png')", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(10,186,181,0.08) 0%, transparent 70%)", transform: "translate(20%, -20%)" }}
              />

              <AnimatePresence mode="wait">
                {sent ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center text-center py-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: "rgba(10,186,181,0.12)", border: "1px solid rgba(10,186,181,0.3)" }}
                    >
                      <CheckCircle2 size={28} style={{ color: "#0ABAB5" }} />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2">Message sent!</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Thanks for reaching out. Someone from our team will reply within 24 hours.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-6 text-xs font-medium px-4 py-2 rounded-xl transition-all duration-200"
                      style={{ background: "rgba(10,186,181,0.1)", color: "#0ABAB5", border: "1px solid rgba(10,186,181,0.2)" }}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-1">
                      <p className="font-display font-bold text-lg mb-0.5">Send us a message</p>
                      <p className="text-xs text-muted-foreground">We'll get back to you within 24 hours.</p>
                    </div>

                    {/* Topic selector */}
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Topic</label>
                      <div className="flex flex-wrap gap-2">
                        {topics.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setActiveTopic(t)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                            style={
                              activeTopic === t
                                ? { background: "rgba(10,186,181,0.15)", border: "1px solid rgba(10,186,181,0.4)", color: "#0ABAB5" }
                                : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }
                            }
                          >
                            {t}
                            <input type="hidden" name="topic" value={activeTopic} style={{ display: "none" }} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name + Email row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Name</label>
                        <input
                          required
                          name="name"
                          className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground"
                          style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)" }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(10,186,181,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Email</label>
                        <input
                          type="email"
                          required
                          name="email"
                          className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground"
                          style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)" }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(10,186,181,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Company <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                      </label>
                      <input
                        name="company"
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground"
                        style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(10,186,181,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        placeholder="Acme Corp"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Message</label>
                      <textarea
                        required
                        name="message"
                        rows={4}
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition resize-none placeholder:text-muted-foreground"
                        style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(10,186,181,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        placeholder="Tell us what you're working on..."
                      />
                    </div>

                    {/* reCAPTCHA Widget (visible v2 checkbox) */}
                    <div className="flex flex-col items-center gap-2">
                      <div ref={recaptchaRef} className="g-recaptcha" />
                      <p className="text-xs text-muted-foreground text-center max-w-sm">
                        This site is protected by reCAPTCHA and the Google
                        {" "}
                        <a href="/privacy" style={{ color: "#0ABAB5", textDecoration: "underline" }}>
                          Privacy Policy
                        </a>
                        {" "}and{" "}
                        <a href="/terms" style={{ color: "#0ABAB5", textDecoration: "underline" }}>
                          Terms of Service
                        </a>
                        {" "}apply.
                      </p>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      className="btn-gradient w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={15} />
                      Send message
                    </motion.button>

                    {/* <p className="text-center text-xs text-muted-foreground">
                      By submitting you agree to our{" "}
                      <a href="#" style={{ color: "#0ABAB5", textDecoration: "none" }}>Privacy Policy</a>.
                    </p> */}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;