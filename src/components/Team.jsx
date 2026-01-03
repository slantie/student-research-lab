import { useState } from "react";

const Team = () => {
  const faculty = [
    {
      name: "Dr. Himani Trivedi",
      role: "Head of MMPSRC & MMPSRPC Cell, LDRP-ITR, KSV",
      department: "Computer Engineering",
      specialization: "PhD",
      research:
        "Student research frameworks, applied AI systems, institutional research development",
      image: "/team/faculty/Maam Photo.png",
    },
  ];

  const students = [
    {
      name: "Kandarp Gajjar",
      role: "Research Assistant",
      branch: "Computer Engineering",
      semester: "8th",
      email: "kandarp@email.com",
      linkedin: "https://linkedin.com",
      research: "Smart Grid Systems",
      image: "/team/students/Kandarpbhai.jpg",
    },
    {
      name: "Hemant Pande",
      role: "Undergraduate Student",
      branch: "Computer Engineering",
      semester: "6th",
      email: "hemant@email.com",
      linkedin: "https://linkedin.com",
      research: "Autonomous Navigation",
      image: "/team/students/Hemant Pande.jpg",
    },
    {
      name: "Pragati Varu",
      role: "Undergraduate Student",
      branch: "Computer Engineering",
      semester: "4th",
      email: "pragati@email.com",
      linkedin: "https://linkedin.com",
      research: "Water Quality IoT",
      image: "/team/students/Pragati Varu.jpeg",
    },
    {
      name: "Mahi Parmar",
      role: "Undergraduate Student",
      branch: "Computer Engineering",
      semester: "4th",
      email: "mahi@email.com",
      linkedin: "https://linkedin.com",
      research: "Drone Technology",
      image: "/team/students/Mahi Parmar.jpg",
    },
    {
      name: "Aayush Pandya",
      role: "Undergraduate Student",
      branch: "Computer Engineering",
      semester: "4th",
      email: "aayush@email.com",
      linkedin: "https://linkedin.com",
      research: "Solar Optimization",
      image: "/team/students/Aayush Pandya.jpeg",
    },
    {
      name: "Rudr Halvadiya",
      role: "Undergraduate Student",
      branch: "Computer Engineering",
      semester: "4th",
      email: "rudr@email.com",
      linkedin: "https://linkedin.com",
      research: "Predictive Maintenance",
      image: "/team/students/Rudr.png",
    },
  ];

  return (
    <section id="team" className="pt-6 pb-6 px-6 mx-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-16">
          {/* MAIN TITLE */}
          <h2 className="text-4xl font-bold text-center mb-20">
            Meet the Team
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* FACULTY SECTION */}
            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-10 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-8 text-center">
                Faculty Mentor
              </h3>

              <FacultyCard member={faculty[0]} />
            </div>

            {/* STUDENT SECTION */}
            <div className="lg:col-span-8 bg-neutral-50 rounded-2xl p-10 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-8 text-center">
                Student Researchers
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-4xl">
                {students.map((student, i) => (
                  <StudentCard key={i} member={student} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- FACULTY CARD ---------- */

const FacultyCard = ({ member }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl px-10 py-10 w-full max-w-sm transition-all duration-300 hover:scale-[1.04]"
    >
      <div className="text-center">
        <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden bg-neutral-200">
          <img
            src={member.image}
            alt={member.name}
            onError={(e) => (e.target.src = "/team/default-avatar.png")}
            className="w-full h-full object-cover"
          />
        </div>

        <h4 className="font-semibold">{member.name}</h4>
        <p className="text-sm text-neutral-600">{member.role}</p>
        <p className="text-sm text-neutral-500">{member.specialization}</p>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          hovered ? "max-h-60 opacity-100 mt-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-neutral-700">
          <b>Department:</b> {member.department}
        </p>
        <p className="text-sm text-neutral-700">
          <b>Research:</b> {member.research}
        </p>
      </div>
    </div>
  );
};

/* ---------- STUDENT CARD ---------- */

const StudentCard = ({ member }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl px-8 py-8 w-full max-w-sm transition-all duration-300 hover:scale-[1.04]"
    >
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-neutral-200">
          <img
            src={member.image}
            alt={member.name}
            onError={(e) => (e.target.src = "/team/default-avatar.png")}
            className="w-full h-full object-cover"
          />
        </div>

        <h4 className="text-sm font-semibold">{member.name}</h4>
        <p className="text-xs text-neutral-600">{member.role}</p>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          hovered ? "max-h-60 opacity-100 mt-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-xs text-neutral-700 text-center">
          {member.branch} · {member.semester} Semester
        </p>
        <p className="text-xs text-neutral-700 text-center">
          <b>Research:</b> {member.research}
        </p>
      </div>
    </div>
  );
};

export default Team;
