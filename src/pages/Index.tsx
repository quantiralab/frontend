import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import DemoTeaser from "@/components/DemoTeaser";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <HowItWorks />
    <Features />
    <DemoTeaser />
    <Pricing />
    <Testimonials />
    <About />
    <FAQ />
    <Contact />
    <Footer />
  </div>
);

export default Index;
