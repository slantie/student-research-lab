import { useEffect, useState } from "react";

const BlurText = ({
  text,
  delay = 1,
  animateBy = "words",
  direction = "left",
  onAnimationComplete,
  className = "",
}) => {
  const units = animateBy === "words" ? text.split(" ") : text.split("");
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < units.length) {
      const timer = setTimeout(
        () => setVisibleCount((v) => v + 1),
        delay
      );
      return () => clearTimeout(timer);
    } else {
      onAnimationComplete && onAnimationComplete();
    }
  }, [visibleCount, units.length, delay, onAnimationComplete]);

  return (
    <span className={className}>
      {units.map((unit, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-700 ease-out"
          style={{
            opacity: index < visibleCount ? 1 : 0,
            filter: index < visibleCount ? "blur(0px)" : "blur(5px)",
            transform:
              index < visibleCount
                ? "translateX(0)"
                : direction === "left"
                ? "translateX(-10px)"
                : "translateX(10px)",
            marginRight: animateBy === "words" ? "0.45rem" : "0",
            whiteSpace: "pre-wrap",
          }}
        >
          {unit}
        </span>
      ))}
    </span>
  );
};

export default BlurText;
