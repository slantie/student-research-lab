import React, { useState, useEffect } from "react";
import teamData from "../data/teamMembers.json";
import Leaderboard from "./Leaderboard";
import { fetchResearchers, fetchAttendanceStats, fetchScoreStats } from "../lib/dataService";

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
  const radius = 30;
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
  /* ---- Local data as fallback ---- */
  const { faculty: localFaculty, students: localStudents, researchAssistants: localAssistants } = teamData;
  
  const [faculty, setFaculty] = useState(localFaculty);
  const [students, setStudents] = useState(localStudents);
  const [researchAssistants, setResearchAssistants] = useState(localAssistants || []);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadFromSupabase();
  }, []);

  async function loadFromSupabase() {
    try {
      const [researchers, attData, scoreData] = await Promise.all([
        fetchResearchers(),
        fetchAttendanceStats(),
        fetchScoreStats(),
      ]);

      // If Supabase returned no data, keep local
      if (!researchers || researchers.length === 0) {
        setLoaded(true);
        return;
      }

      // Build attendance + score lookup
      const attStats = attData?.stats || {};
      const scoreMap = scoreData || {};

      // Map Supabase researchers to card-compatible format
      const mapResearcher = (r) => {
        const att = attStats[r.id];
        const attPct = att && att.total > 0 ? Math.round((att.present / att.total) * 100) : undefined;
        const totalScore = scoreMap[r.id] ?? undefined;

        return {
          name: r.name,
          image: r.image_url || "/team/default-avatar.png",
          Department: r.department || "",
          Semester: r.semester || "",
          Batch: r.batch || "",
          Institute: r.institute || "",
          Linkedin: r.linkedin || "",
          email: r.email || "",
          attendance_percentage: attPct,
          total_score: totalScore,
          // Faculty-specific
          role: r.role_title || "",
          department: r.department || "",
          specialization: r.specialization || "",
          research: r.research_areas || "",
          linkedin: r.linkedin || "",
        };
      };

      const mapped = researchers.map(mapResearcher);

      const facultyList = mapped.filter((_, i) => researchers[i].role_type === 'faculty');
      const raList = mapped.filter((_, i) => researchers[i].role_type === 'research_assistant');
      const studentList = mapped.filter((_, i) => researchers[i].role_type === 'student');

      if (facultyList.length > 0) setFaculty(facultyList);
      if (raList.length > 0) setResearchAssistants(raList);
      if (studentList.length > 0) setStudents(studentList);
    } catch (err) {
      console.warn("Supabase load failed, using local data:", err.message);
    } finally {
      setLoaded(true);
    }
  }

  const lead = faculty[0];
  const allStudentsForLeaderboard = [...researchAssistants, ...students];

  return (
    <section id="team" className="min-h-screen pt-6 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto space-y-12">

        {/* HEADER */}
        <div className="text-center mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">Our Researchers</h1>
          <p className="text-text-muted max-w-2xl mx-auto">The talented team driving innovation and discovery at the Student Research Lab.</p>
        </div>

        {/* ================= FACULTY TILE ================= */}
        <div className="bg-white rounded-2xl px-6 lg:px-12 py-8 lg:py-10 border border-border">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-text-primary">
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
                  "Research is not about answers alone, but about cultivating the
                  courage to ask better questions."
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
              "Research is not about answers alone, but about cultivating the
              courage to ask better questions."
            </blockquote>

          </div>
        </div>



        {/* ================= STUDENTS TILE ================= */}
        <div className="bg-white rounded-2xl px-6 lg:px-12 py-8 lg:py-10 border border-border">
          
          {/* LEADERBOARD SECTION */}
          <Leaderboard students={allStudentsForLeaderboard} />

          {/* RESEARCH ASSISTANTS SECTION */}
          {researchAssistants.length > 0 && (
            <>
                <h2 className="text-2xl font-bold text-center mb-8 text-text-primary">
                    Research Assistants
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-start mb-12">
                    {researchAssistants.map((student, i) => (
                    <StudentCard key={i} member={student} />
                    ))}
                </div>
            </>
          )}

          <h2 className="text-2xl font-bold text-center mb-8 text-text-primary">
            Student Researchers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-start">
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
        group
        relative
        bg-white
        rounded-2xl
        overflow-hidden
        border border-neutral-100
        transition-all
        duration-300
        hover:shadow-xl
        hover:-translate-y-1
        flex flex-col h-full
      "
    >
      {/* CARD CONTENT */}
      <div className="p-5 flex flex-col items-center h-full relative z-10 bg-white group-hover:bg-neutral-50/50 transition-colors">
        <div className="mb-4 relative">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500">
            <img
              src={member.image || "/team/default-avatar.png"}
              alt={member.name}
              onError={(e) => (e.currentTarget.src = "/team/default-avatar.png")}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Badge for Score/Attendance (Optional - visual cue) */}
          {member.total_score > 0 && (
            <div className="absolute -bottom-1 -right-1 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white shadow-sm flex items-center gap-1">
              <TrophyIcon className="w-3 h-3" />
              {member.total_score}
            </div>
          )}
        </div>

        <div className="text-center flex-grow w-full">
          <h4 className="font-bold text-lg text-neutral-800 mb-1 leading-tight flex items-center justify-center gap-1.5">
            {member.name.trim()}
            {member.Linkedin && (
              <a
                href={member.Linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077b5] opacity-60 hover:opacity-100 transition-opacity"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            )}
          </h4>
          
          <div className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-neutral-500 text-xs font-semibold tracking-wide mb-3 uppercase">
            {member.Department} • Sem {member.Semester}
          </div>

          <p className="text-xs text-neutral-400 font-medium mb-4">
             {member.Institute}
          </p>

          {/* Stats Row */}
          {(member.attendance_percentage !== undefined || member.total_score !== undefined) && (
            <div className="flex items-center justify-center gap-6 mt-auto pt-4 border-t border-neutral-100 w-full">
              {member.attendance_percentage !== undefined && (
                <div className="flex flex-col items-center">
                  <span className={`text-sm font-bold ${
                    member.attendance_percentage >= 75 ? "text-emerald-600" : 
                    member.attendance_percentage >= 60 ? "text-amber-500" : "text-rose-500"
                  }`}>
                    {member.attendance_percentage}%
                  </span>
                  <span className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Attendance</span>
                </div>
              )}
              
              {member.total_score !== undefined && (
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-amber-600">
                    {member.total_score}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Score</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* HOVER OVERLAY - RESEARCH INTERESTS */}
      <div 
        className="
          absolute inset-0 z-20
          bg-gradient-to-t from-primary/95 via-primary/90 to-primary/80
          backdrop-blur-[2px]
          p-6
          flex flex-col justify-center items-center text-center
          translate-y-full group-hover:translate-y-0
          transition-transform duration-300 ease-out
          text-white
        "
      >
        <h5 className="font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-2 w-full">
          Research Areas
        </h5>
        
        {member.research ? (
          <p className="text-sm font-medium leading-relaxed">
            {member.research}
          </p>
        ) : (
          <div className="space-y-2">
            <p className="text-sm opacity-90 italic">
              "Exploring new frontiers in technology and engineering."
            </p>
          </div>
        )}

        {member.specialization && (
          <div className="mt-4 pt-4 border-t border-white/20 w-full">
            <span className="block text-[10px] uppercase opacity-70 mb-1">Specialization</span>
            <span className="text-sm font-semibold">{member.specialization}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
