import React from "react";
import { motion } from "framer-motion";

const TrophyIcon = ({ className, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={color || "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ fill: color ? "currentColor" : "none" }} // Ensure fill works
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const Leaderboard = ({ students }) => {
  const sortedStudents = [...(students || [])]
    .filter((s) => s.total_score !== undefined && s.total_score > 0)
    .sort((a, b) => {
      // Primary Sort: Total Score (Descending)
      if (b.total_score !== a.total_score) {
        return b.total_score - a.total_score;
      }
      // Secondary Sort: Attendance Percentage (Descending)
      return (b.attendance_percentage || 0) - (a.attendance_percentage || 0);
    });

  if (sortedStudents.length === 0) return null;

  // Calculate Ranks and Group
  const rankedGroups = [];
  let currentRank = 1;
  
  // Helper to get or create group for a rank
  const getGroup = (rank) => {
    let group = rankedGroups.find(g => g.rank === rank);
    if (!group) {
      group = { rank, students: [] };
      rankedGroups.push(group);
    }
    return group;
  };

  for (let i = 0; i < sortedStudents.length; i++) {
    const student = sortedStudents[i];
    
    if (i > 0) {
      const prevStudent = sortedStudents[i - 1];
      const prevScore = prevStudent.total_score || 0;
      const prevAtt = prevStudent.attendance_percentage || 0;
      const currScore = student.total_score || 0;
      const currAtt = student.attendance_percentage || 0;

      if (currScore !== prevScore || currAtt !== prevAtt) {
        currentRank++;
      }
    }
    const group = getGroup(currentRank);
    group.students.push(student);
  }

  // Top 5 FACES (not just groups)
  const topRankGroups = [];
  let faceCount = 0;
  for (const group of rankedGroups) {
    if (faceCount >= 5) break;
    topRankGroups.push(group);
    faceCount += group.students.length;
  }
  
  // Remaining students for the list
  // We filter out groups that are already in topRankGroups
  const topRankRanks = topRankGroups.map(g => g.rank);
  const restGroups = rankedGroups.filter(g => !topRankRanks.includes(g.rank));
  const restStudents = restGroups.flatMap(g => g.students.map(s => ({ ...s, rank: g.rank })));

  const getRankColor = (rank, type = "text") => {
    switch (rank) {
      case 1: return type === "bg" ? "bg-yellow-100" : "text-yellow-500";
      case 2: return type === "bg" ? "bg-gray-100" : "text-gray-400";
      case 3: return type === "bg" ? "bg-orange-100" : "text-orange-500";
      default: return type === "bg" ? "bg-blue-50" : "text-blue-500";
    }
  };

  return (
    <div className="bg-white rounded-3xl px-6 lg:px-10 py-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 mb-16 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-yellow-50/50 to-transparent rounded-bl-full pointer-events-none opacity-50" />

      <h2 className="text-3xl font-bold text-center mb-10 text-neutral-800 flex items-center justify-center gap-3 relative z-10">
        <span className="bg-yellow-100 p-2 rounded-xl text-yellow-600">
           <TrophyIcon className="w-6 h-6" />
        </span>
        Leaderboard
      </h2>

      {/* --- TOP RANK GROUPS GRID --- */}
      {/* Dynamic Grid: If we have exactly 5 faces, we usually fit a 5-col grid. 
          If Rank 1 has 2 people (span 2) + 3 singles = 5 cols. Perfect. 
      */}
      <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-12 relative z-10 items-end`}>
        {topRankGroups.map((group, index) => {
          const isShared = group.students.length > 1;
          const { rank, students: groupStudents } = group;
          // Use first student for score display
          const primaryStudent = groupStudents[0]; 

          const isFirst = index === 0;

          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              key={rank}
              className={`
                relative
                flex flex-col items-center
                p-4 lg:p-6 rounded-2xl
                border 
                transition-all duration-300 hover:shadow-lg
                ${isFirst 
                  ? `bg-gradient-to-b from-yellow-50 to-white border-yellow-200 shadow-md scale-105 z-10 order-first md:col-span-1 ${isShared ? "lg:col-span-2" : "lg:col-span-1"}` 
                  : "bg-white border-neutral-100 shadow-sm"
                }
              `}
            >
              {/* Rank Badge */}
              <div className={`
                absolute -top-3
                min-w-[2rem] h-8 px-2 rounded-full 
                flex items-center justify-center
                font-bold text-sm
                shadow-sm border
                ${rank === 1 ? "bg-yellow-500 text-white border-yellow-400" : "bg-white text-neutral-500 border-neutral-200"}
              `}>
                #{rank}
              </div>

              {/* Students Container */}
              <div className={`flex items-start justify-center ${isShared ? "gap-6 lg:gap-10 w-full" : "w-auto"}`}>
                {groupStudents.map((s, i) => (
                  <div key={i} className="flex flex-col items-center">
                     {/* Avatar */}
                     <div className={`
                        relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-4 shadow-sm mb-3 transition-transform hover:scale-105 duration-300
                        ${rank === 1 ? "border-yellow-200" : "border-neutral-50"}
                     `}>
                        <img 
                          src={s.image || "/team/default-avatar.png"} 
                          alt={s.name}
                          onError={(e) => (e.currentTarget.src = "/team/default-avatar.png")}
                          className="w-full h-full object-cover"
                        />
                     </div>
                     
                     {/* Name */}
                     <h3 className="font-bold text-neutral-800 text-center text-xs lg:text-sm leading-tight max-w-[120px]">
                        {s.name}
                     </h3>
                  </div>
                ))}
              </div>
              
              {/* Score */}
              <div className={`
                 flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-sm font-bold
                 ${getRankColor(rank, "bg")} ${getRankColor(rank, "text")}
              `}>
                 <span>{primaryStudent.total_score} pts</span>
              </div>
              
            </motion.div>
          );
        })}
      </div>

      {/* --- REST LIST --- */}
      {restStudents.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm relative z-10">
           {/* Header */}
           <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-neutral-50/80 text-[10px] lg:text-xs font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-200">
              <div className="col-span-2 lg:col-span-1 text-center">Rank</div>
              <div className="col-span-2 lg:col-span-1"></div>
              <div className="col-span-5 lg:col-span-6">Student</div>
              <div className="hidden lg:block lg:col-span-2">Batch</div>
              <div className="col-span-3 lg:col-span-2 text-right">Score</div>
           </div>

           <div className="divide-y divide-neutral-50 max-h-96 overflow-y-auto custom-scrollbar">
             {restStudents.map((student, index) => (
                 <div key={student.id || index} className="grid grid-cols-12 gap-4 px-6 py-3 items-center hover:bg-neutral-50/50 transition-colors duration-150 group">
                    <div className="col-span-2 lg:col-span-1 text-center font-bold text-neutral-400 bg-neutral-100/50 rounded-lg py-1 text-xs">
                      #{student.rank}
                    </div>
                    
                    <div className="col-span-2 lg:col-span-1">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-100 ring-2 ring-white group-hover:ring-neutral-200 transition-shadow">
                        <img 
                          src={student.image || "/team/default-avatar.png"} 
                          alt={student.name} 
                          onError={(e) => (e.currentTarget.src = "/team/default-avatar.png")}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="col-span-5 lg:col-span-6 font-medium text-sm text-neutral-700 truncate">
                      {student.name}
                    </div>

                    <div className="hidden lg:block lg:col-span-2 text-xs text-neutral-500">
                      {student.Batch}
                    </div>

                    <div className="col-span-3 lg:col-span-2 text-right font-bold text-neutral-700 text-sm">
                      {student.total_score}
                    </div>
                 </div>
               )
             )}
           </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
