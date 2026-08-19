import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/About";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="relative pt-32 pb-8 lg:pt-40 lg:pb-12">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 45% at 20% 20%, rgba(10,186,181,0.12) 0%, transparent 65%), radial-gradient(ellipse 45% 40% at 80% 18%, rgba(196,77,255,0.12) 0%, transparent 65%)",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto"
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
                <Sparkles size={13} color="#0ABAB5" />
                <span
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: "#0ABAB5" }}
                >
                  About us
                </span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-5">
                The team behind{" "}
                <span className="gradient-text">QuantiraViz</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We are on a mission to make the world's knowledge visually
                explorable. Learn about our story, our vision, and the journey
                so far.
              </p>
            </motion.div>
          </div>
        </section>

        <AboutSection />
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
