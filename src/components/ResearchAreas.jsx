import { useEffect, useState } from "react";

const ResearchAreas = () => {
  const [activeResearch, setActiveResearch] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const researchWorks = [
    {
      title: "Artificial Intelligence & Machine Learning",
      status: "Ongoing",
      short: "Applied research on intelligent systems and data-driven models.",
      description:
        "This research focuses on machine learning algorithms, intelligent systems, and data-driven decision-making, emphasizing real-world applications and experimentation.",
      members: [
        {
          name: "Aayush Pandya",
          semester: "4th",
          branch: "CE",
          email: "aayush@email.com",
          linkedin: "https://linkedin.com",
        },
        {
          name: "Mahi Parmar",
          semester: "4th",
          branch: "CE",
          email: "mahi@email.com",
          linkedin: "https://linkedin.com",
        },
      ],
    },
    {
      title: "Cybersecurity & Digital Trust",
      status: "Ongoing",
      short: "Secure systems, cryptography, and trust frameworks.",
      description:
        "This research explores cryptographic techniques, secure architectures, and trust-based digital systems for modern applications.",
      members: [
        {
          name: "Kandarp Gajjar",
          semester: "8th",
          branch: "CE",
          email: "kandarp@email.com",
          linkedin: "https://linkedin.com",
        },
        {
          name: "Hemant Pande",
          semester: "6th",
          branch: "CE",
          email: "hemant@email.com",
          linkedin: "https://linkedin.com",
        },
      ],
    },
    {
      title: "Internet of Things (IoT)",
      status: "Completed",
      short: "Sensor-based systems for real-world monitoring.",
      description:
        "Completed research on IoT sensor networks, data aggregation, and monitoring systems deployed in controlled environments.",
      members: [
        {
          name: "Hemant Pande",
          semester: "8th",
          branch: "CE",
          email: "hemant@email.com",
          linkedin: "https://linkedin.com",
        },
        {
          name: "Pragati Varu",
          semester: "4th",
          branch: "CE",
          email: "pragati@email.com",
          linkedin: "https://linkedin.com",
        },
      ],
    },
    {
      title: "Quantum Computing & Cryptography",
      status: "Ongoing",
      short: "Exploring quantum algorithms and post-quantum security models.",
      description:
        "This research investigates quantum computing principles, quantum algorithms, and their impact on modern cryptographic systems, including post-quantum security frameworks.",
      members: [
        {
          name: "Aayush Pandya",
          semester: "4th",
          branch: "CE",
          email: "aayush@email.com",
          linkedin: "https://linkedin.com",
        },
        {
          name: "Kandarp Gajjar",
          semester: "8th",
          branch: "CE",
          email: "kandarp@email.com",
          linkedin: "https://linkedin.com",
        },
      ],
    },
  ];

  const openModal = (work) => {
    setActiveResearch(work);
    setIsOpening(true);
    setTimeout(() => setIsOpening(false), 20);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveResearch(null);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && activeResearch) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activeResearch]);

  return (
    <section id="research" className="pt-6 pb-28 px-6 mx-4">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl p-20 bg-white">
          <h2 className="text-4xl font-bold mb-16">
            Research Works
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {researchWorks.map((work) => (
              <div
                key={work.title}
                onClick={() => openModal(work)}
                className="
                  relative cursor-pointer rounded-2xl p-8
                  bg-neutral-100
                  transition-colors duration-300
                  hover:bg-neutral-200
                "
              >
                <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-medium">
                  {work.status === "Ongoing" ? (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                      </span>
                      <span className="text-emerald-700">
                        Ongoing
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="inline-flex h-2 w-2 rounded-full bg-neutral-400"></span>
                      <span className="text-neutral-500">
                        Completed
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  {work.title}
                </h3>

                <p className="text-sm text-neutral-600">
                  {work.short}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {activeResearch && (
        <div
          onClick={closeModal}
          className="
            fixed inset-0 z-50
            flex items-center justify-center px-6
            bg-black/50 backdrop-blur-sm
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`
              relative max-w-3xl w-full bg-white rounded-3xl p-10
              transform transition-all duration-300 ease-out
              ${
                isClosing
                  ? "opacity-0 scale-95"
                  : isOpening
                  ? "opacity-0 scale-95"
                  : "opacity-100 scale-100"
              }
            `}
          >
            <div className="mb-8">
              <span className="text-xs uppercase tracking-wide text-neutral-500">
                {activeResearch.status}
              </span>
              <h3 className="text-3xl font-bold mt-2">
                {activeResearch.title}
              </h3>
            </div>

            <p className="text-neutral-700 leading-relaxed mb-10">
              {activeResearch.description}
            </p>

            <h4 className="text-xl font-semibold mb-6">
              Research Team
            </h4>

            <div className="grid sm:grid-cols-2 gap-6">
              {activeResearch.members.map((member) => (
                <div
                  key={member.name}
                  className="rounded-xl p-5 bg-neutral-100"
                >
                  <p className="font-semibold">
                    {member.name}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {member.branch} · {member.semester} Semester
                  </p>

                  <div className="mt-3 flex gap-4 text-sm">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      Email
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResearchAreas;
