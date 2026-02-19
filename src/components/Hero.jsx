import BlurText from "./ui/BlurText.jsx";
import { Link } from "react-router-dom";

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
        min-h-[calc(100vh-88px)]
        flex items-center
        pb-8
        px-4 sm:px-6 lg:px-8
        scroll-mt-28
      "
    >
      <div className="max-w-[1400px] w-full mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center justify-between">
          {/* LEFT COLUMN */}
          <div className="lg:max-w-[55%] text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-40 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              MMPSRPC · Kadi Sarva Vishwavidyalaya
            </div>

            {/* MAIN TITLE */}
            <h1
              className="
              text-3xl sm:text-5xl lg:text-[3.5rem]
              font-extrabold
              leading-snug sm:leading-tight lg:leading-[1.12]
              mb-5
              text-text-primary
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
                className="text-primary"
              />
            </h1>

            {/* SUBTITLE */}
            <p
              className="
              max-w-xl
              mx-auto lg:mx-0
              text-base sm:text-lg
              leading-relaxed
              mb-8
              text-text-muted
            "
            >
              We are a collaborative hub where undergraduate and graduate students
              tackle real-world problems through interdisciplinary research,
              guided by expert faculty mentorship.
            </p>

            {/* HERO BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                to="/research"
                className="btn-primary"
              >
                Explore Research
              </Link>

              <Link
                to="/activities"
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
                  text-center
                "
              >
                Activities
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-10 flex flex-wrap gap-8 justify-center lg:justify-start text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-text-primary">30+</p>
                <p className="text-sm text-text-muted">Active Members</p>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-text-primary">4+</p>
                <p className="text-sm text-text-muted">Research Works</p>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-text-primary">15+</p>
                <p className="text-sm text-text-muted">Research Domains</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — LOGO */}
          <div className="flex items-center justify-center lg:justify-end shrink-0">
            <div className="text-center">
              <img
                src="/SRL Logo.webp"
                alt="Student Research Lab MMPSRPC KSV"
                className="
                  w-32 h-32
                  sm:w-40 sm:h-40
                  lg:w-56 lg:h-56
                  mx-auto mb-5
                  object-contain
                  drop-shadow-xl
                "
              />

              <h3
                className="
                text-xl sm:text-2xl lg:text-3xl
                font-semibold
                tracking-wide
                text-primary
              "
              >
                Student Research Lab
              </h3>

              <div className="mx-auto mt-3 h-1 w-20 sm:w-28 rounded-full bg-[#5EEAD4]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
