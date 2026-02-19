import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Background from "./components/Background";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Objectives from "./components/Objectives";
import JoinLab from "./components/JoinLab";

import ResearchAreas from "./components/ResearchAreas";
import Activities from "./components/Activities";
import Team from "./components/Team";
import BackToTop from "./components/BackToTop";
import OrganizationDetails from "./components/OrganizationDetails";
import Contact from "./components/Contact";

// Admin (lazy loaded)
import AdminApp from "./admin/AdminApp";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ResearchersPage from "./admin/pages/ResearchersPage";
import ResearchPage from "./admin/pages/ResearchPage";
import ActivitiesPage from "./admin/pages/ActivitiesPage";
import AttendancePage from "./admin/pages/AttendancePage";
import ScoresPage from "./admin/pages/ScoresPage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Skip preloader for admin routes
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, [isAdmin]);

  // Admin routes — completely separate layout
  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminApp />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="researchers" element={<ResearchersPage />} />
          <Route path="research" element={<ResearchPage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="scores" element={<ScoresPage />} />
        </Route>
      </Routes>
    );
  }

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
                      <Objectives />
                      <JoinLab />
                    </>
                  }
                />
                <Route path="/research" element={<ResearchAreas />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/team" element={<Team />} />
                <Route path="/about/contact" element={<Contact />} />
                <Route path="/about/:orgId" element={<OrganizationDetails />} />
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
