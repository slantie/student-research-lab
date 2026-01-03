import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Background from "./components/Background";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import About from "./components/About";
import ResearchAreas from "./components/ResearchAreas";
import Gallery from "./components/Gallery";
import Team from "./components/Team";
import JoinLab from "./components/JoinLab";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      {/* Background layer */}
      <Background />

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />

        <main className="pt-16 space-y-16">
          <Hero />
          <About />
          <ResearchAreas />
          <Gallery />
          <Team />
          <JoinLab />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
