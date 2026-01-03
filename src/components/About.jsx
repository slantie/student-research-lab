const About = () => {
  return (
    <section id="about" className="pt-28 pb-6 px-6 mx-4">
      <div className="max-w-7xl mx-auto">

        {/* PRIMARY ABOUT CARD */}
        <div className="rounded-2xl p-16 bg-white">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* LEFT CONTENT */}
            <div className="lg:pr-8">
              <h2 className="text-4xl font-bold leading-tight mb-8">
                About the Student Research Lab
              </h2>

              <p className="text-lg leading-relaxed max-w-xl">
                The Student Research Lab fosters a collaborative environment
                where engaging engineering students explore ideas, conduct
                research, and develop innovative solutions under faculty
                mentorship, bridging theory with real-world engineering
                challenges.
              </p>

              {/* RESEARCH FOCUS CARD */}
              <div className="mt-16 max-w-xl">
                <div className="rounded-2xl bg-neutral-50 p-8">
                  <h3 className="text-2xl font-semibold mb-3">
                    Research Focus
                  </h3>

                  <div className="h-1 w-16 rounded-full mb-6 bg-[#5EEAD4]" />

                  <ul className="space-y-4 leading-relaxed">
                    <li>
                      Interdisciplinary research addressing emerging
                      technologies and real-world societal challenges.
                    </li>
                    <li>
                      Emphasis on applied research and industry-relevant,
                      solution-oriented problem solving.
                    </li>
                    <li>
                      Skill-oriented learning through hands-on projects, guided
                      experimentation, and collaborative exploration.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT — RESPONSIVE BENTO GRID */}
            <div className="lg:pl-8 flex items-center">
              <div
                className="
                  grid
                  grid-cols-1
                  gap-4

                  sm:grid-cols-2
                  sm:auto-rows-fr

                  lg:grid-cols-3
                  lg:grid-rows-3
                "
              >

                {/* Active Members */}
                <div className="
                  rounded-2xl
                  bg-gradient-to-br from-neutral-100 to-neutral-50
                  p-6
                  transition-colors duration-300
                  hover:bg-[#ECFDF5]
                ">
                  <p className="text-sm text-neutral-500">Active Members</p>
                  <p className="text-3xl font-bold mt-2">30+</p>
                </div>

                {/* Research Domains */}
                <div className="
                  lg:col-span-2
                  rounded-2xl
                  bg-gradient-to-br from-neutral-100 to-neutral-50
                  p-6
                  transition-colors duration-300
                  hover:bg-[#ECFDF5]
                ">
                  <p className="text-sm text-neutral-500">Research Domains</p>
                  <p className="text-3xl font-bold mt-2">8+</p>
                </div>

                {/* Applied Research */}
                <div className="
                  rounded-2xl
                  bg-gradient-to-br from-neutral-100 to-neutral-50
                  p-6
                  flex items-center
                  transition-colors duration-300
                  hover:bg-[#ECFDF5]
                ">
                  <p className="text-sm font-bold leading-snug">
                    Applied
                    <br />
                    Research
                  </p>
                </div>

                {/* CENTER LOGO */}
                <div className="flex items-center justify-center">
                  <div className="
                    h-24 w-24
                    lg:h-28 lg:w-28
                    rounded-full
                    bg-white
                    shadow-2xl
                    flex items-center justify-center
                    ring-8 ring-neutral-200/40
                  ">
                    <img
                      src="/SRL Logo.png"
                      alt="SRL Logo"
                      className="h-18 w-18 lg:h-18 lg:w-18 object-contain"
                    />
                  </div>
                </div>

                {/* Guided Mentorship */}
                <div className="
                  rounded-2xl
                  bg-gradient-to-br from-neutral-100 to-neutral-50
                  p-6
                  flex items-center justify-end text-right
                  transition-colors duration-300
                  hover:bg-[#ECFDF5]
                ">
                  <p className="text-sm font-bold leading-snug">
                    Guided
                    <br />
                    Mentorship
                  </p>
                </div>

                {/* Workshops */}
                <div className="
                  lg:col-span-2
                  rounded-2xl
                  bg-gradient-to-br from-neutral-100 to-neutral-50
                  p-6
                  transition-colors duration-300
                  hover:bg-[#ECFDF5]
                ">
                  <p className="text-sm text-neutral-500 font-semibold">
                    Workshops
                  </p>
                  <p className="text-xl font-bold mt-1">
                    Hands-on Learning
                  </p>
                </div>

                {/* Publications */}
                <div className="
                  rounded-2xl
                  bg-gradient-to-br from-neutral-100 to-neutral-50
                  p-6
                  transition-colors duration-300
                  hover:bg-[#ECFDF5]
                ">
                  <p className="text-sm text-neutral-500">Publications</p>
                  <p className="text-3xl font-bold mt-2">2+</p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
