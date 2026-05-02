import Hero from "@/components/Hero";
import ValueProp from "@/components/ValueProp";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValueProp />
      <Features />
      <HowItWorks />
      <Comparison />
      <FinalCTA />
      <Footer />
    </main>
  );
}
