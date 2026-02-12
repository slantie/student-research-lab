import { useState, useEffect } from "react";
import Photo1 from "../assets/gallery/Photo1.webp";
import Photo2 from "../assets/gallery/Photo2.webp";
import Photo3 from "../assets/gallery/Photo3.webp";
import Photo4 from "../assets/gallery/Photo4.webp";

const Gallery = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const galleryItems = [
    {
      title: "Faculty-Led Research Sessions",
      description:
        "Guided research discussions and mentoring sessions conducted by experienced faculty members.",
      image: Photo1,
      year: 2024,
    },
    {
      title: "Hands-on Technical Workshops",
      description:
        "Practical workshops that help students apply theoretical concepts using tools and experiments.",
      image: Photo2,
      year: 2023,
    },
    {
      title: "Collaborative Group Activities",
      description:
        "Team-based activities designed to promote collaboration and problem-solving skills.",
      image: Photo3,
      year: 2024,
    },
    {
      title: "Competitive Challenges",
      description:
        "Engaging challenges that make engineering learning enjoyable.",
      image: Photo4,
      year: 2022,
    },
    // --- Additional Items for Masonry Verification ---
    {
      title: "Innovation Hackathon",
      description:
        "A 24-hour hackathon where students build prototypes to solve real-world problems.",
      image: Photo2,
      year: 2024,
    },
    {
      title: "Industry Expert Talk",
      description:
        "Guest lectures from industry leaders sharing insights on current technological trends.",
      image: Photo1,
      year: 2023,
    },
    {
      title: "Project Exhibition",
      description:
        "Showcasing final year projects to external examiners and industry peers.",
      image: Photo3,
      year: 2023,
    },
    {
      title: "Robotics Workshop",
      description:
        "Hands-on session on building and programming autonomous robots.",
      image: Photo4,
      year: 2022,
    },
    {
      title: "Alumni Meet",
      description:
        "Connecting with past students to build a strong professional network.",
      image: Photo1,
      year: 2024,
    },
    {
      title: "Tech Quiz",
      description:
        "Testing technical knowledge in a fun and competitive environment.",
      image: Photo2,
      year: 2023,
    },
  ];

  // Group by year
  const groupedItems = galleryItems.reduce((acc, item) => {
    (acc[item.year] = acc[item.year] || []).push(item);
    return acc;
  }, {});

  // Sort years descending
  const sortedYears = Object.keys(groupedItems).sort((a, b) => b - a);

  /* ESC closes popup */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const openPopup = (item) => {
    setActiveItem(item);
    requestAnimationFrame(() => setIsPopupVisible(true));
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setTimeout(() => setActiveItem(null), 300);
  };

  return (
    <section
      id="gallery"
      className="
        pt-8 sm:pt-12
        pb-10 sm:pb-16
        px-4 sm:px-6 lg:px-8
        overflow-x-hidden
      "
    >
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl bg-white px-6 sm:px-10 lg:px-16 py-8 sm:py-12">

          {/* HEADER — CENTER ALIGNED */}
          <div className="mb-10 sm:mb-16 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Gallery
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              A glimpse into workshops, research sessions, and collaborative
              learning experiences at the Student Research Lab.
            </p>
          </div>

          {/* YEAR SECTIONS */}
          <div className="space-y-16">
            {sortedYears.map((year) => (
              <div key={year}>
                {/* YEAR HEADER */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-2xl sm:text-3xl font-bold text-neutral-800">
                    {year}
                  </span>
                  <div className="h-px bg-neutral-200 flex-1 relative top-1"></div>
                </div>

                {/* MASONRY GRID FOR THIS YEAR */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                  {groupedItems[year].map((item, i) => (
                    <div
                      key={i}
                      onClick={() => openPopup(item)}
                      className="
                        break-inside-avoid
                        mb-4
                        cursor-pointer
                        group
                        rounded-xl
                        overflow-hidden
                        bg-neutral-50
                        transition-all
                        duration-300
                        hover:shadow-lg
                        hover:-translate-y-1
                      "
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover"
                      />
                      
                      <div className="p-4">
                         <h3 className="text-base font-semibold text-neutral-800 mb-1 group-hover:text-primary transition-colors">
                           {item.title}
                         </h3>
                         <p className="text-sm text-neutral-500 line-clamp-2">
                           {item.description}
                         </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* POPUP */}
      {activeItem && (
        <div
          onClick={closePopup}
          className={`
            fixed inset-0 z-50
            flex items-center justify-center
            px-4 sm:px-6
            transition-all duration-300 ease-out
            ${isPopupVisible ? "bg-black/60 backdrop-blur-sm opacity-100" : "bg-black/0 opacity-0"}
          `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`
              bg-white rounded-2xl
              max-w-5xl w-full
              grid grid-cols-1 md:grid-cols-2
              overflow-hidden
              transform transition-all duration-300 ease-out
              ${isPopupVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
            `}
          >
            <div className="bg-neutral-100 flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full max-h-[70vh] object-contain"
              />
            </div>

            <div className="px-6 py-6 sm:px-10 sm:py-8 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl sm:text-2xl font-semibold">
                  {activeItem.title}
                </h3>
                <span className="text-sm font-medium px-3 py-1 bg-neutral-100 rounded-full text-neutral-600">
                  {activeItem.year}
                </span>
              </div>
              
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
