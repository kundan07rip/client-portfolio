import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import Timeline from "@/components/Timeline";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MagneticCursor from "@/components/MagneticCursor";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PortfolioGrid />
        <Timeline />
        <About />
        <Contact />
      </main>
      <Footer />
      <MagneticCursor />
    </>
  );
}
