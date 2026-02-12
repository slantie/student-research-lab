import BlurText from "./ui/BlurText.jsx";

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
        sm:pt-28 lg:pt-32
        pb-10 sm:pb-8
        px-4 sm:px-6 md:px-8
        scroll-mt-28
      "
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse sm:flex-row gap-12 items-center justify-center">
        {/* LEFT COLUMN */}
        <div className="lg:pr-6 text-center lg:text-left">
          {/* MAIN TITLE */}
          <h1
            className="
            text-3xl sm:text-5xl lg:text-6xl
            font-extrabold
            leading-snug sm:leading-tight lg:leading-[1.15]
            mb-6
            text-[#1F1F1F]
          "
          >
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
          <p
            className="
            max-w-xl
            mx-auto lg:mx-0
            text-base sm:text-lg
            leading-relaxed
            mb-10
            text-[#3A3A35]
          "
          >
            We are a collaborative hub where undergraduate and graduate students
            tackle real-world problems through interdisciplinary research.
          </p>

          {/* HERO BUTTONS */}
          <div
            className="
            mt-8 sm:mt-10
            flex flex-col sm:flex-row
            gap-4 sm:gap-6
            justify-center lg:justify-start
          "
          >
            <button
              onClick={() => scrollToSection("research")}
              className="btn-primary"
            >
              Explore Research
            </button>

            <button
              onClick={() => scrollToSection("join")}
              className="
                px-7 sm:px-8 py-3
                rounded-full
                border-2 border-primary
                text-primary
                font-semibold
                transition-all
                hover:bg-primary
                hover:text-white
                hover:scale-[1.03]
              "
            >
              Join the Lab
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN — LOGO */}
        <div className="flex items-center justify-center lg:pl-6 mt-10 lg:mt-0">
          <div className="text-center">
            <img
              src="/SRL Logo.webp"
              alt="Student Research Lab MMPSRPC KSV"
              className="
                w-28 h-28
                sm:w-36 sm:h-36
                md:w-44 md:h-44
                lg:w-48 lg:h-48
                mx-auto mb-6
                object-contain
              "
            />

            <h3
              className="
              text-xl sm:text-2xl md:text-4xl
              font-semibold
              tracking-wide
              text-[#115E59]
            "
            >
              Student Research Lab
            </h3>

            <div className="mx-auto mt-3 h-1 w-20 sm:w-28 rounded-full bg-[#5EEAD4]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
