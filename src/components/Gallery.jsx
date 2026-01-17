import { useEffect, useRef, useState } from "react";
import Photo1 from "../assets/gallery/Photo1.webp";
import Photo2 from "../assets/gallery/Photo2.webp";
import Photo3 from "../assets/gallery/Photo3.webp";
import Photo4 from "../assets/gallery/Photo4.webp";

const Gallery = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const galleryItems = [
    {
      title: "Faculty-Led Research Sessions",
      description:
        "Guided research discussions and mentoring sessions conducted by experienced faculty members.",
      image: Photo1,
      direction: "top-left",
    },
    {
      title: "Hands-on Technical Workshops",
      description:
        "Practical workshops that help students apply theoretical concepts using tools and experiments.",
      image: Photo2,
      direction: "top-right",
    },
    {
      title: "Collaborative Group Activities",
      description:
        "Team-based activities designed to promote collaboration and problem-solving skills.",
      image: Photo3,
      direction: "bottom-left",
    },
    {
      title: "Competitive Challenges",
      description:
        "Engaging challenges that make engineering learning enjoyable.",
      image: Photo4,
      direction: "bottom-right",
    },
  ];

  /* ESC closes popup */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /* OBSERVER — RUN EVERY TIME */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openPopup = (item) => {
    setActiveItem(item);
    requestAnimationFrame(() => setIsPopupVisible(true));
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setTimeout(() => setActiveItem(null), 300);
  };

  /* RESPONSIVE INWARD TRANSFORMS */
  const getTransform = (direction) => {
    if (isVisible) return "opacity-100 translate-x-0 translate-y-0";

    switch (direction) {
      case "top-left":
        return "opacity-0 -translate-x-12 -translate-y-12 sm:-translate-x-24 sm:-translate-y-24";
      case "top-right":
        return "opacity-0 translate-x-12 -translate-y-12 sm:translate-x-24 sm:-translate-y-24";
      case "bottom-left":
        return "opacity-0 -translate-x-12 translate-y-12 sm:-translate-x-24 sm:translate-y-24";
      case "bottom-right":
        return "opacity-0 translate-x-12 translate-y-12 sm:translate-x-24 sm:translate-y-24";
      default:
        return "opacity-0";
    }
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
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

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                onClick={() => openPopup(item)}
                className={`
                  cursor-pointer
                  rounded-2xl
                  p-5 sm:p-6
                  bg-neutral-50
                  transition-all
                  duration-[1200ms]
                  ease-[cubic-bezier(0.4,0,0.2,1)]
                  hover:bg-neutral-100
                  ${getTransform(item.direction)}
                `}
              >
                <div className="rounded-xl overflow-hidden mb-4 sm:mb-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 sm:h-72 object-contain"
                  />
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
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
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                {activeItem.title}
              </h3>
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
