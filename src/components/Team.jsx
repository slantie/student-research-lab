import React, { useState, useEffect } from "react";
import teamData from "../data/teamMembers.json";
import Leaderboard from "./Leaderboard";

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

/* ---- TROPHY ICON ---- */
const TrophyIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

/* ---- CIRCULAR PROGRESS ---- */
const CircularProgress = ({ percentage, colorClass }) => {
  const radius = 30; //Increased radius to prevent overlap
  const stroke = 3.5; 
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 origin-center"
        >
          <circle
            stroke="#f0f0f0"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="currentColor"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset, transition: "stroke-dashoffset 1s ease-in-out" }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={colorClass}
          />
        </svg>
        <span className={`absolute text-xs font-bold ${colorClass}`}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

/* ================= MAIN ================= */

const Team = () => {
  /* ---- Initialize with local data to ensure immediate render (SSR/Mobile fix) ---- */
  const { faculty, students: localStudents, researchAssistants: localAssistants } = teamData;
  const [students, setStudents] = useState(localStudents);
  const [researchAssistants, setResearchAssistants] = useState(localAssistants || []);

  useEffect(() => {
    fetch("http://localhost:8000/students")
      .then((res) => {
        if (!res.ok) {
           throw new Error("Backend not reachable");
        }
        return res.json();
      })
      .then((data) => {
        if (!data || !data.students) return;

        // Helper to merge backend data with local JSON
        const mergeData = (backendList, referenceLocalList) => {
            return backendList.map((backendStudent) => {
                const localStudent = referenceLocalList.find(
                    (s) => s.name.trim().toLowerCase() === backendStudent.name.trim().toLowerCase()
                );
                return {
                    ...backendStudent,
                    image: localStudent?.image || "/team/default-avatar.png",
                    Department: localStudent?.Department || "CE",
                    Semester: localStudent?.Semester || "4th",
                    Batch: localStudent?.Batch || "2024-2028",
                    Institute: localStudent?.Institute || "LDRP-ITR",
                    Linkedin: localStudent?.Linkedin || "",
                    email: localStudent?.email || "",
                    attendance_percentage: backendStudent.attendance_percentage ?? localStudent?.attendance_percentage,
                    total_score: backendStudent.total_score ?? localStudent?.total_score
                };
            });
        };

        // Identify Research Assistants names for filtering
        const raNames = (localAssistants || []).map(ra => ra.name.trim().toLowerCase());

        // Split backend data
        const backendRAs = data.students.filter(s => raNames.includes(s.name.trim().toLowerCase()));
        const backendStds = data.students.filter(s => !raNames.includes(s.name.trim().toLowerCase()));

        // Merge and separate states
        // Note: For RAs, we use localAssistants as reference. For regular students, localStudents.
        // We only update if backend provided data. If backendRAs is empty but localAssistants exists,
        // we might ideally want to keep local fallback, but current logic mimics "backend drives list".
        // To support "local fallback" if backend lacks them (e.g. name mismatch), 
        // we could augment the list. For now, sticking to the filtered backend lists to match existing behavior.
        
        if (backendRAs.length > 0) {
            setResearchAssistants(mergeData(backendRAs, localAssistants || []));
        }
        if (backendStds.length > 0) {
            setStudents(mergeData(backendStds, localStudents));
        }
      })
      .catch((err) => {
        console.warn("Using local data fallback:", err.message);
      });
  }, [localStudents, localAssistants]);
  
  const lead = faculty[0];
  const allStudentsForLeaderboard = [...researchAssistants, ...students];

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
                <p>
                  <b>Research Interests:</b> {lead.research}
                </p>
                {lead.email && (
                  <p className="flex items-center gap-2"> 
                    <a 
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${lead.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/70 hover:text-primary transition inline-flex items-center gap-1"
                    >
                      <MailIcon className="w-4 h-4" />
                      {lead.email}
                    </a>
                  </p>
                )}

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
          
          {/* LEADERBOARD SECTION */}
          <Leaderboard students={allStudentsForLeaderboard} />

          {/* RESEARCH ASSISTANTS SECTION */}
          {researchAssistants.length > 0 && (
            <>
                <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800">
                    Research Assistants
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start mb-16">
                    {researchAssistants.map((student, i) => (
                    <StudentCard key={i} member={student} />
                    ))}
                </div>
            </>
          )}

          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800">
            Student Researchers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
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
  return (
    <div
      className="
        bg-neutral-50
        rounded-2xl
        p-5
        text-center
        transition-shadow
        duration-300
        hover:shadow-lg
        flex flex-col h-full
      "
    >
      <div className="flex justify-center mb-3">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-sm">
          <img
            src={member.image || "/team/default-avatar.png"}
            alt={member.name}
            onError={(e) => (e.currentTarget.src = "/team/default-avatar.png")}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-grow">
        <h4 className="font-bold text-lg text-neutral-800 mb-1 leading-tight max-w-[12rem] mx-auto">
          <span className="inline">
            {member.name.trim()}
          </span>
          {member.Linkedin && (
            <a
              href={member.Linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block align-middle ml-1 text-primary/70 hover:text-primary transition"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
        </h4>
        <p className="text-xs font-medium text-neutral-500 mb-4 uppercase tracking-wide">
          {member.Department} · {member.Semester} Sem
        </p>

        <div className="mb-4">
          <p className="text-xs text-neutral-500">
            <span className="font-semibold text-neutral-700">Batch:</span> {member.Batch}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
             {member.Institute}
          </p>
        </div>

        {/* Attendance & Score Stats Container */}
        {(member.attendance_percentage !== undefined || member.total_score !== undefined) && (
          <div className="flex items-center justify-center gap-4 bg-white border border-neutral-100 rounded-xl p-3 shadow-sm">
            
            {/* Attendance Section */}
            {member.attendance_percentage !== undefined && (
              <div className="flex flex-col items-center gap-1">
                <CircularProgress 
                  percentage={member.attendance_percentage} 
                  colorClass={
                    member.attendance_percentage >= 75 ? "text-green-500" : 
                    member.attendance_percentage >= 60 ? "text-yellow-500" : "text-red-500"
                  }
                />
                <span className="text-[9px] uppercase font-bold text-neutral-400">Attendance</span>
              </div>
            )}

            {/* Divider */}
            {member.attendance_percentage !== undefined && member.total_score !== undefined && (
                <div className="w-px h-8 bg-neutral-100"></div>
            )}

            {/* Score Section */}
            {member.total_score !== undefined && (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-50 rounded-full text-yellow-600">
                    <TrophyIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-sm font-bold text-neutral-800">{member.total_score}</span>
                    <span className="text-[9px] uppercase font-bold text-neutral-400">Score</span>
                </div>
              </div>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
