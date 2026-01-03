const JoinLab = () => {
  return (
    <section id="join" className="pt-6 pb-28 px-6 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-16 text-center">
          {/* TITLE */}
          <h2 className="text-4xl font-bold mb-6 text-neutral-800">
            Join the Research Lab
          </h2>

          {/* SUBTITLE */}
          <p className="text-neutral-600 max-w-2xl mx-auto mb-24 leading-relaxed">
            We invite motivated engineering students to participate in
            faculty-guided research, interdisciplinary collaboration, and
            innovation-driven projects. Interested students may express their
            interest through the application form below.
          </p>

          {/* PROCESS STEPS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-24">
            {/* STEP 01 */}
            <div
              className="
              rounded-2xl p-10 text-center
              bg-primary/5
              transition-transform duration-300
              hover:scale-[1.03]
            "
            >
              <div className="text-xs font-semibold tracking-widest text-primary/60 mb-4">
                STEP 01
              </div>
              <h3 className="font-semibold text-lg mb-3 text-neutral-800">
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
              rounded-2xl p-10 text-center
              bg-primary/5
              transition-transform duration-300
              hover:scale-[1.03]
            "
            >
              <div className="text-xs font-semibold tracking-widest text-primary/60 mb-4">
                STEP 02
              </div>
              <h3 className="font-semibold text-lg mb-3 text-neutral-800">
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
              rounded-2xl p-10 text-center
              bg-primary/5
              transition-transform duration-300
              hover:scale-[1.03]
            "
            >
              <div className="text-xs font-semibold tracking-widest text-primary/60 mb-4">
                STEP 03
              </div>
              <h3 className="font-semibold text-lg mb-3 text-neutral-800">
                Onboarding
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Selected students are onboarded into active research groups and
                guided through their initial research phase.
              </p>
            </div>
          </div>

          {/* CTA BUTTON — SAME THEME */}
          <div className="flex justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfvRBJzeQJy62QXnOlN9xX4VMEWV3EGdorRlJ_bev9sVANdMQ/viewform?usp=dialog"
              target="_blank"
              rel="noreferrer"
              className="
      px-14 py-4
      rounded-lg
      font-semibold
      transition-all duration-300
      hover:scale-[1.03]
    "
              style={{
                backgroundColor: "#5EEAD4",
                color: "#134E4A",
              }}
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
