import { useEffect, useState } from "react";

const BackToTop = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = Math.min(scrollTop / docHeight, 1);
      setProgress(scrolled);
      setVisible(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        fixed
        bottom-6
        right-6
        z-50
        w-[80px]
        h-[80px]
        flex
        items-center
        justify-center
        transition-all
        duration-300
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
      `}
    >
      {/* OUTER RING */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 72 72"
      >
        {/* Base ring */}
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="#0f9d8a"
          strokeWidth="5"
          opacity="0.25"
          strokeLinecap="butt"
        />

        {/* ✅ Progress ring — REAL-TIME */}
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="#fae8c3"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
        />
      </svg>

      {/* INNER CIRCLE */}
      <div
        className="
          w-[52px]
          h-[52px]
          rounded-full
          bg-[#fae8c3]
          flex
          items-center
          justify-center
          shadow-lg
          relative
          z-10
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-[#065f46]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </div>
    </button>
  );
};

export default BackToTop;
