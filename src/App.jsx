import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Background from "./components/Background";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import JoinLab from "./components/JoinLab";

import ResearchAreas from "./components/ResearchAreas";
import Gallery from "./components/Gallery";
import Team from "./components/Team";
import BackToTop from "./components/BackToTop";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <Background />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 pt-[88px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
            >
              <Routes location={location}>
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      <About />
                      <Timeline />
                      <JoinLab />
                    </>
                  }
                />
                <Route path="/research" element={<ResearchAreas />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/team" element={<Team />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
