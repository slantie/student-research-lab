import logo from "../assets/SRL Logo.png";
import BlurText from "./ui/BlurText";

const Hero = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="
        min-h-screen
        pt-28
        pb-4
        px-4 sm:px-6
        scroll-mt-28
      "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT COLUMN */}
        <div className="lg:pr-6 text-center lg:text-left">

          {/* MAIN TITLE */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 text-[#1F1F1F]">
            <BlurText
              text="Transforming Notion into"
              delay={120}
              animateBy="words"
              direction="left"
              className="inline-block"
            />
            <br />
            <BlurText
              text="Innovation"
              delay={180}
              animateBy="words"
              direction="left"
              className="text-[#115E59]"
            />
          </h1>

          {/* SUBTITLE */}
          <p className="max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 text-[#3A3A35]">
            We are a collaborative hub where undergraduate and graduate students
            tackle real-world problems through interdisciplinary research.
          </p>

          {/* HERO BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => scrollToSection("research")}
              className="
                px-6 py-3
                text-base font-semibold
                rounded-lg
                transition-colors
                w-full sm:w-auto
                bg-[#5EEAD4]
                text-[#134E4A]
                hover:opacity-90
              "
            >
              Explore our research →
            </button>

            <button
              onClick={() => scrollToSection("join")}
              className="
                px-6 py-3
                text-base font-semibold
                rounded-lg
                transition-colors
                w-full sm:w-auto
                bg-[#5EEAD4]
                text-[#134E4A]
                hover:opacity-90
              "
            >
              Join The Lab
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN — LOGO */}
        <div className="flex items-center justify-center lg:pl-6">
          <div className="text-center">

            <img
              src={logo}
              alt="Student Research Lab MMPSRPC KSV"
              className="
                w-28 h-28
                sm:w-36 sm:h-36
                md:w-40 md:h-40
                mx-auto mb-6
                object-contain
              "
            />

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-[#115E59]">
              Student Research Lab
            </h3>

            <div className="mx-auto mt-3 h-1 w-24 sm:w-28 rounded-full bg-[#5EEAD4]" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
