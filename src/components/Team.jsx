import { useState } from "react";
import teamData from "../data/teamMembers.json";

/* ---- helper to detect touch devices ---- */
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

/* ---- ICONS ---- */
const LinkedInIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" className={className}>
    <path d="M 4 5 C 2.9069372 5 2 5.9069372 2 7 L 2 23 C 2 24.093063 2.9069372 25 4 25 L 26 25 C 27.093063 25 28 24.093063 28 23 L 28 7 C 28 5.9069372 27.093063 5 26 5 L 4 5 z M 6.6992188 7 L 23.300781 7 L 15 13.134766 L 6.6992188 7 z M 5 9.4746094 L 15 16.865234 L 25 9.4746094 L 25 23 L 5 23 L 5 9.4746094 z" />
  </svg>
);

/* ================= MAIN ================= */

const Team = () => {
  const { faculty, students } = teamData;
  const lead = faculty[0];

  return (
    <section id="team" className="pt-14 pb-16 lg:pb-24 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ================= FACULTY TILE ================= */}
        <div className="bg-white rounded-3xl px-6 lg:px-16 py-10 lg:py-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-neutral-800">
            Faculty
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* DETAILS */}
            <div className="order-3 lg:order-none">
              <h3 className="flex items-center gap-3 text-2xl lg:text-3xl font-bold text-neutral-800">
                {lead.name}
                {lead.linkedin && (
                  <a
                    href={lead.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/60 hover:text-primary transition"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                )}
              </h3>

              <p className="text-lg text-neutral-600 mt-1">{lead.role}</p>

              <div className="mt-2 space-y-3 text-neutral-600">
                <p><b>Department:</b> {lead.department}</p>
                <p><b>Specialization:</b> {lead.specialization}</p>
                <p><b>Institute:</b> {lead.institute}</p>
                <p>
                  <b>Research Interests:</b> {lead.research}
                </p>

                <blockquote className="hidden lg:block pl-4 border-l-4 border-primary/30 italic text-neutral-600 mt-4">
                  “Research is not about answers alone, but about cultivating the
                  courage to ask better questions.”
                </blockquote>
              </div>
            </div>

            {/* IMAGE */}
            <div className="order-1 lg:order-none flex flex-col items-center lg:items-end lg:pr-1">
              <div className="w-50 lg:w-[26rem] flex justify-center">
                <img
                  src={lead.image}
                  alt={lead.name}
                  onError={(e) => (e.currentTarget.src = "/team/default-avatar.png")}
                  className="
                    block
                    max-w-full
                    max-h-[22rem]
                    h-auto
                    object-contain
                    rounded-xl
                    shadow-[0_18px_36px_rgba(0,0,0,0.18)]
                  "
                />
              </div>
            </div>

            {/* MOBILE-ONLY QUOTE */}
            <blockquote
              className="
                order-2
                lg:hidden
                mt-2
                pl-4
                border-l-4
                border-primary/30
                italic
                text-neutral-600
              "
            >
              “Research is not about answers alone, but about cultivating the
              courage to ask better questions.”
            </blockquote>

          </div>
        </div>

        {/* ================= STUDENTS TILE ================= */}
        <div className="bg-white rounded-3xl px-6 lg:px-16 py-10 lg:py-14">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800">
            Student Researchers
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {students.map((student, i) => (
              <StudentCard key={i} member={student} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================= STUDENT CARD ================= */

const StudentCard = ({ member }) => {
  const [open, setOpen] = useState(false);
  const touch = isTouchDevice();

  return (
    <div
      onMouseEnter={!touch ? () => setOpen(true) : undefined}
      onMouseLeave={!touch ? () => setOpen(false) : undefined}
      onClick={touch ? () => setOpen((v) => !v) : undefined}
      className="
        bg-neutral-50
        rounded-2xl
        p-6
        text-center
        cursor-pointer
        transition-shadow
        duration-300
      "
    >
      <div className="flex justify-center mb-2">
        <div className="w-48 h-48 rounded-lg overflow-hidden bg-neutral-200">
          <img
            src={member.image || "/team/default-avatar.png"}
            alt={member.name}
            onError={(e) => (e.currentTarget.src = "/team/default-avatar.png")}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <h4 className="font-semibold text-neutral-800">{member.name}</h4>
      <p className="text-sm text-neutral-600">
        {member.Department} · {member.Semester} Semester
      </p>

      <div
        className={`
          ${open ? "mt-4" : "mt-0"}
          overflow-hidden
          transition-all
          duration-500
          ease-out
          transform
          ${open
            ? "max-h-48 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"}
        `}
      >
        <p className="text-sm text-neutral-600 mt-2">
          <b>Batch:</b> {member.Batch}
        </p>

        <p className="text-sm text-neutral-600 mt-1">
          <b>Institute:</b> {member.Institute}
        </p>

        <div className="flex justify-center gap-4 mt-4">
          {member.Linkedin && (
            <a
              href={member.Linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/70 hover:text-primary transition"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          )}

          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-primary/70 hover:text-primary transition"
            >
              <MailIcon className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
