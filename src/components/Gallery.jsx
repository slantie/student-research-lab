import { useEffect, useRef, useState } from "react";
import Photo1 from "../assets/gallery/Photo1.jpeg";
import Photo2 from "../assets/gallery/Photo2.jpeg";
import Photo3 from "../assets/gallery/Photo3.jpeg";
import Photo4 from "../assets/gallery/Photo4.jpeg";

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

  /* ESC closes popup smoothly */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /* OBSERVE SECTION ONCE */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
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
    setTimeout(() => setActiveItem(null), 300); // match transition duration
  };

  /* INWARD DIAGONAL TRANSFORMS */
  const getTransform = (direction) => {
    if (isVisible) {
      return "opacity-100 translate-x-0 translate-y-0";
    }

    switch (direction) {
      case "top-left":
        return "opacity-0 -translate-x-24 -translate-y-24";
      case "top-right":
        return "opacity-0 translate-x-24 -translate-y-24";
      case "bottom-left":
        return "opacity-0 -translate-x-24 translate-y-24";
      case "bottom-right":
        return "opacity-0 translate-x-24 translate-y-24";
      default:
        return "opacity-0";
    }
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="pt-4 pb-6 px-6 mx-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl p-8 sm:p-12 lg:p-16 bg-white">

          {/* HEADER */}
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Gallery
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              A glimpse into workshops, research sessions, and collaborative
              learning experiences at the Student Research Lab.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                onClick={() => openPopup(item)}
                className={`
                  cursor-pointer
                  rounded-2xl
                  p-6
                  bg-neutral-50
                  transition-all
                  duration-[1200ms]
                  ease-[cubic-bezier(0.4,0,0.2,1)]
                  hover:bg-neutral-100
                  ${getTransform(item.direction)}
                `}
              >
                <div className="rounded-xl overflow-hidden mb-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 sm:h-72 object-contain"
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
            flex items-center justify-center p-6
            transition-all duration-300 ease-out
            ${isPopupVisible ? "bg-black/60 backdrop-blur-sm opacity-100" : "bg-black/0 opacity-0"}
          `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`
              bg-white rounded-2xl max-w-5xl w-full
              grid grid-cols-1 md:grid-cols-2 overflow-hidden
              transform transition-all duration-300 ease-out
              ${isPopupVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
            `}
          >
            <div className="bg-neutral-100 flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full max-h-[75vh] object-contain"
              />
            </div>

            <div className="p-8 sm:p-10 flex flex-col justify-center">
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
