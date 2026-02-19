import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchActivities as fetchActivitiesFromDB } from "../lib/dataService";

// Local images
import Pic2 from "../assets/gallery/pic2.png";
import Pic3 from "../assets/gallery/Pic3.png";
import Photo1 from "../assets/gallery/Photo1.webp";
import Photo2 from "../assets/gallery/Photo2.webp";
import Photo3 from "../assets/gallery/Photo3.webp";
import Pic1 from "../assets/gallery/pic1.png";
import Pic4 from "../assets/gallery/pic4.png";

/* ---- LOCAL FALLBACK DATA ---- */
const LOCAL_ACTIVITIES = [
  {
    title: "Research Internship Project Presentation (CSIR & NTRO)",
    description: "Six internship projects presented by students who interned at CSIR and NTRO.",
    detailed: "The Student Research Lab (SRL) at MMPSRPC hosted a Research Internship Project Presentation. Students gained hands-on research experience at the Council of Scientific and Industrial Research (CSIR) and the National Technical Research Organisation (NTRO), reflecting the cell's commitment to nurturing future researchers.",
    image: Pic3,
    year: 2025,
    date: "28 November 2025",
    category: "presentation",
    participants: "Palak Vanpariya, Dhrumi Patel, Kritika Thakkar, Princy Patel, Krish Patel, Samarth Suthar, Oum Gadhani, Kandarp Gajjar",
    highlights: ["6 internship projects presented", "CSIR & NTRO research exposure", "Best Presentation Award"],
    venue: "Research Lab, LDRP ITR",
  },
  {
    title: "Alumni Connect Session",
    description: "Insightful interaction conducted by alumni from Google and AMD for SRL members.",
    detailed: "The discussion highlighted the importance of focused effort, guided mentorship, and adaptability in navigating professional challenges. Students gained meaningful perspectives on sustaining growth through clarity of direction and continuous improvement.",
    image: Photo1,
    year: 2025,
    date: "27 December 2025",
    category: "session",
    participants: "Mr. Manan Darji (Google), Ms. Dhwani Jakhaniya (AMD), SRL Members",
    highlights: ["Speakers from Google & AMD", "Career guidance session", "Mentorship insights"],
    venue: "LDRP-ITR, KSV",
  },
  {
    title: "Faculty-Led Research Sessions",
    description: "Guided research discussions and mentoring sessions conducted by experienced faculty members.",
    detailed: "Regular faculty-led sessions where students present research progress, receive feedback, and learn research methodologies under expert guidance.",
    image: Pic2,
    year: 2026,
    date: "4 February 2026",
    category: "session",
    highlights: ["Expert faculty mentoring", "Research methodology training"],
    venue: "Student Research Lab",
  },
  {
    title: "InnovAItion Hackathon",
    description: "Students innovate and build AI-powered solutions in a high-energy, time-bound hackathon event.",
    detailed: "A competitive hackathon where student teams developed innovative AI-powered prototypes to solve real-world challenges. The event fostered teamwork, creative thinking, and rapid prototyping skills.",
    image: Pic1,
    year: 2026,
    date: "10 & 11 January 2026",
    category: "hackathon",
    highlights: ["24-hour hackathon format", "AI-powered prototypes", "Team-based competition"],
    venue: "LDRP-ITR Campus",
  },
  {
    title: "Active Research Culture at SRL",
    description: "Showcases the vibrant research culture at SRL — A new beginning of MMPSRPC.",
    detailed: "The Student Research Lab established a thriving research environment with weekly sessions, collaborative projects, and a growing community of young researchers.",
    image: Photo3,
    year: 2025,
    date: "December 2025",
    category: "milestone",
    highlights: ["Launch of SRL research culture", "Weekly research sessions established"],
    venue: "LDRP-ITR Campus",
  },
  {
    title: "Weekly Exercise & Debate Sessions",
    description: "Students evolving beyond routine academics through structured debates and exercises.",
    detailed: "Regular sessions designed to develop communication skills, critical thinking, and the ability to construct and defend research arguments effectively.",
    image: Photo2,
    year: 2025,
    date: "December 2025",
    category: "session",
    highlights: ["Communication skill development", "Critical thinking exercises"],
    venue: "Student Research Lab",
  },
];

const CATEGORY_LABELS = {
  all: "All",
  hackathon: "Hackathons",
  session: "Sessions",
  presentation: "Presentations",
  workshop: "Workshops",
  milestone: "Milestones",
  seminar: "Seminars",
};

const CATEGORY_COLORS = {
  hackathon: "bg-amber-100 text-amber-800",
  session: "bg-blue-100 text-blue-800",
  presentation: "bg-emerald-100 text-emerald-800",
  workshop: "bg-purple-100 text-purple-800",
  milestone: "bg-rose-100 text-rose-800",
  seminar: "bg-cyan-100 text-cyan-800",
};

const Activities = () => {
  const [activities, setActivities] = useState(LOCAL_ACTIVITIES);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchActivitiesFromDB();
        if (data && data.length > 0) {
          const mapped = data.map((a) => ({
            title: a.title,
            description: a.description || "",
            detailed: a.brief || a.description || "",
            image: a.image_url || "",
            year: a.year,
            link: a.link || "",
            date: a.date_label || "",
            category: "session",
          }));
          setActivities(mapped);
        }
      } catch {
        /* fallback already set */
      }
    }
    load();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedActivity(null);
    };
    if (selectedActivity) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedActivity]);

  const categories = ["all", ...new Set(activities.map((a) => a.category).filter(Boolean))];
  const filtered = filter === "all" ? activities : activities.filter((a) => a.category === filter);

  // Group by year
  const grouped = filtered.reduce((acc, item) => {
    const y = item.year || "Other";
    (acc[y] = acc[y] || []).push(item);
    return acc;
  }, {});
  const sortedYears = Object.keys(grouped).sort((a, b) => b - a);

  return (
    <section className="min-h-screen pb-16 px-4 sm:px-6 lg:px-8 pt-6">
      <div className="max-w-[1400px] mx-auto">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">Activities & Events</h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Workshops, research sessions, hackathons, and collaborative learning experiences at the Student Research Lab.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                filter === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-card text-text-muted border border-border hover:border-primary/30 hover:text-primary"
              }`}
            >
              {CATEGORY_LABELS[cat] || cat}
            </button>
          ))}
        </div>

        {/* YEAR SECTIONS */}
        <div className="space-y-12">
          {sortedYears.map((year) => (
            <div key={year}>
              {/* Year Label */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-text-primary">{year}</span>
                <div className="h-px bg-border flex-1" />
                <span className="text-sm text-text-muted">{grouped[year].length} events</span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {grouped[year].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    onClick={() => setSelectedActivity(item)}
                    className="group cursor-pointer bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    {item.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Category badge */}
                        {item.category && (
                          <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[item.category] || "bg-gray-100 text-gray-600"}`}>
                            {CATEGORY_LABELS[item.category] || item.category}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5">
                      {item.date && (
                        <p className="text-xs text-text-muted font-medium mb-2 uppercase tracking-wider">
                          {item.date}
                        </p>
                      )}
                      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-muted line-clamp-2 mb-3">
                        {item.description}
                      </p>

                      {/* Highlights preview */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.highlights.slice(0, 2).map((h, idx) => (
                            <span key={idx} className="text-xs bg-primary/8 text-primary px-2 py-0.5 rounded-full">
                              {h}
                            </span>
                          ))}
                          {item.highlights.length > 2 && (
                            <span className="text-xs text-text-muted">+{item.highlights.length - 2} more</span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            <p className="text-lg">No activities found in this category.</p>
          </div>
        )}
      </div>

      {/* ========== DETAIL MODAL ========== */}
      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedActivity(null)}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-10 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-border relative"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors cursor-pointer"
              >
                ✕
              </button>

              {/* Image */}
              {selectedActivity.image && (
                <div className="relative h-56 sm:h-72 overflow-hidden">
                  <img
                    src={selectedActivity.image}
                    alt={selectedActivity.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {selectedActivity.category && (
                    <span className={`absolute bottom-4 left-6 px-3 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[selectedActivity.category] || "bg-gray-100 text-gray-600"}`}>
                      {CATEGORY_LABELS[selectedActivity.category] || selectedActivity.category}
                    </span>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6 sm:p-8">
                {selectedActivity.date && (
                  <p className="text-sm text-text-muted font-medium mb-2">{selectedActivity.date}</p>
                )}

                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                  {selectedActivity.title}
                </h2>

                <p className="text-text-muted leading-relaxed mb-6">
                  {selectedActivity.detailed || selectedActivity.description}
                </p>

                {/* Venue */}
                {selectedActivity.venue && (
                  <div className="flex items-center gap-2 mb-4 text-sm text-text-muted">
                    <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{selectedActivity.venue}</span>
                  </div>
                )}

                {/* Key Highlights */}
                {selectedActivity.highlights && selectedActivity.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">Key Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedActivity.highlights.map((h, idx) => (
                        <span key={idx} className="flex items-center gap-1.5 text-sm bg-primary/8 text-primary px-3 py-1.5 rounded-lg">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Participants */}
                {selectedActivity.participants && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-2 uppercase tracking-wide">Participants</h4>
                    <p className="text-sm text-text-muted leading-relaxed">{selectedActivity.participants}</p>
                  </div>
                )}

                {/* LinkedIn link */}
                {selectedActivity.link && (
                  <a
                    href={selectedActivity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg text-sm font-medium hover:bg-[#005f8d] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.041 0 3.604 2.002 3.604 4.604v5.592z"/>
                    </svg>
                    View on LinkedIn
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Activities;
