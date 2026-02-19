const JoinLab = () => {
  return (
    <section
      id="join"
      className="
        pt-14 sm:pt-20
        pb-16 sm:pb-24
        px-4 sm:px-6 lg:px-8
        overflow-x-hidden
      "
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="
            bg-white
            rounded-3xl
            px-6 sm:px-12 lg:px-16
            py-10 sm:py-14
            text-center
          "
        >
          {/* TITLE */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-neutral-800">
            Join the Research Lab
          </h2>

          {/* SUBTITLE */}
          <p className="text-neutral-600 max-w-2xl mx-auto mb-12 sm:mb-16 leading-relaxed">
            We invite motivated engineering students to participate in
            faculty-guided research, interdisciplinary collaboration, and
            innovation-driven projects. Interested students may express their
            interest through the application form below.
          </p>

          {/* PROCESS STEPS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 mb-12 sm:mb-16">
            {/* STEP 01 */}
            <div
              className="
                rounded-2xl
                px-6 py-8
                text-center
                bg-neutral-50
                transition-transform duration-300
                hover:scale-[1.03]
              "
            >
              <div className="text-xs font-semibold tracking-widest text-primary/60 mb-3">
                STEP 01
              </div>
              <h3 className="font-semibold text-lg mb-2 text-neutral-800">
                Submit Application
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Complete the online form with your academic details, interests,
                and motivation towards research.
              </p>
            </div>

            {/* STEP 02 */}
            <div
              className="
                rounded-2xl
                px-6 py-8
                text-center
                bg-neutral-50
                transition-transform duration-300
                hover:scale-[1.03]
              "
            >
              <div className="text-xs font-semibold tracking-widest text-primary/60 mb-3">
                STEP 02
              </div>
              <h3 className="font-semibold text-lg mb-2 text-neutral-800">
                Review & Interaction
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Applications are reviewed by faculty mentors. Shortlisted
                candidates may be contacted for further interaction.
              </p>
            </div>

            {/* STEP 03 */}
            <div
              className="
                rounded-2xl
                px-6 py-8
                text-center
                bg-neutral-50
                transition-transform duration-300
                hover:scale-[1.03]
              "
            >
              <div className="text-xs font-semibold tracking-widest text-primary/60 mb-3">
                STEP 03
              </div>
              <h3 className="font-semibold text-lg mb-2 text-neutral-800">
                Onboarding
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Selected students are onboarded into active research groups and
                guided through their initial research phase.
              </p>
            </div>
          </div>

          {/* CTA BUTTON */}
          <div className="flex justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfAagn_PS0HSOdzX-lZx7qjKwa37Nd1sPHFWxSyYrj2r7aXZQ/viewform"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinLab;
