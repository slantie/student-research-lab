import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { researchWorks as localResearchWorks } from "../data/researchData";
import { fetchResearchWorks } from "../lib/dataService";

const ResearchAreas = () => {
  const [activeResearch, setActiveResearch] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [researchWorks, setResearchWorks] = useState(localResearchWorks);

  /* ---- Fetch from Supabase ---- */
  useEffect(() => {
    async function loadResearch() {
      try {
        const data = await fetchResearchWorks();
        if (!data || data.length === 0) return;

        const mapped = data.map((w) => {
          // Map work-level members (not attached to any paper)
          const workMembers = (w.research_work_members || [])
            .filter((m) => !m.research_paper_id)
            .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
            .map((m) => ({
              name: m.researcher?.name || '',
              role: m.role || 'Member',
              email: m.researcher?.email || '',
              linkedin: m.researcher?.linkedin || '',
              image: m.researcher?.image_url || '',
              branch: m.researcher?.department || '',
              semester: m.researcher?.semester || '',
              college: m.researcher?.institute || '',
            }));

          // Map papers
          const papers = (w.research_papers || [])
            .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
            .map((p) => ({
              title: p.title,
              description: p.description || '',
              members: (p.research_work_members || [])
                .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                .map((m) => ({
                  name: m.researcher?.name || '',
                  role: m.role || 'Member',
                  email: m.researcher?.email || '',
                  linkedin: m.researcher?.linkedin || '',
                  image: m.researcher?.image_url || '',
                  branch: m.researcher?.department || '',
                  semester: m.researcher?.semester || '',
                  college: m.researcher?.institute || '',
                })),
            }));

          return {
            title: w.title,
            status: w.status || 'Ongoing',
            short: w.short_description || '',
            description: w.description || '',
            guidedBy: w.guided_by || '',
            guideRole: w.guide_role || '',
            image: w.image_url || '/SRL Logo.webp',
            members: workMembers,
            papers: papers.length > 0 ? papers : undefined,
          };
        });

        setResearchWorks(mapped);
      } catch (err) {
        console.warn('Research: using local fallback', err.message);
      }
    }
    loadResearch();
  }, []);

  // Reset index when modal opens
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeResearch]);

  // Auto-play slideshow
  useEffect(() => {
    if (!activeResearch?.images || activeResearch.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % activeResearch.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeResearch]);

  const openModal = (work) => {
    setActiveResearch(work);
  };

  const closeModal = () => {
      setActiveResearch(null);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && activeResearch) closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    
    if (activeResearch) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [activeResearch]);

  return (
    <section
      id="research"
      className="
        pt-6
        pb-16
        px-4 sm:px-6 lg:px-8
        relative
        overflow-hidden
        min-h-screen
      "
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
         <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
         <div className="absolute bottom-[10%] right-[5%] w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-text-primary">
            Research Frontiers
          </h1>
          <p className="text-text-muted">
            Explorations at the intersection of technology and theory.
            Our students are pushing boundaries in these key areas.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {researchWorks.map((work) => {
            const isOngoing = work.status === "Ongoing";

            return (
              <div
                key={work.title}
                onClick={() => openModal(work)}
                className="
                  group relative cursor-pointer
                  rounded-2xl
                  p-6 sm:p-8
                  bg-white
                  border border-neutral-100
                  shadow-sm hover:shadow-xl
                  transition-all duration-300 ease-out
                  hover:-translate-y-1
                  overflow-hidden
                "
              >
                {/* DECORATIVE GRADIENT BLOB */}
                <div className="
                   absolute -right-16 -top-16 w-48 h-48 
                   bg-gradient-to-br from-primary/5 to-transparent 
                   rounded-full blur-3xl 
                   group-hover:scale-150 transition-transform duration-500 ease-in-out
                "></div>

                {/* STATUS PILL */}
                <div className="relative mb-5">
                  {isOngoing ? (
                    <span className="
                      inline-flex items-center gap-2.5
                      px-3 py-1.5
                      rounded-full
                      text-xs font-bold tracking-wide uppercase
                      bg-primary/5 text-primary
                      border border-primary/10
                    ">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-30 animate-ping"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
                      </span>
                      Ongoing
                    </span>
                  ) : (
                    <span className="
                      inline-flex items-center gap-2.5
                      px-3 py-1.5
                      rounded-full
                      text-xs font-bold tracking-wide uppercase
                      bg-neutral-100 text-neutral-500
                    ">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-neutral-400"></span>
                      Completed
                    </span>
                  )}
                </div>

                <h3 className="relative text-xl sm:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors duration-300">
                  {work.title}
                </h3>

                <p className="relative text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {work.short}
                </p>
                
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
                   <span>View Details</span>
                   <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                   </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence onExitComplete={() => (document.body.style.overflow = "auto")}>
      {activeResearch && (
        <motion.div
            key="research-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={closeModal}
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                p-4 sm:p-6
                bg-black/40 backdrop-blur-md
            "
        >
          <motion.div
            key="research-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full max-w-7xl
              bg-white
              rounded-[2.5rem]
              shadow-2xl
              overflow-hidden
              flex flex-col lg:grid lg:grid-cols-5
              max-h-[90vh] h-[90vh]
            "
          >
            {/* LEFT PANEL: IMAGE */}
            <div className="lg:col-span-2 relative h-64 lg:h-full bg-white flex items-center justify-center p-4 overflow-hidden">
                {activeResearch.images && activeResearch.images.length > 1 ? (
                   <div className="relative w-full h-full group">
                       <AnimatePresence mode="wait">
                           <motion.img 
                              key={currentImageIndex}
                              src={activeResearch.images[currentImageIndex]}
                              alt={activeResearch.title}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="w-full h-full object-contain rounded-[2rem] absolute inset-0"
                           />
                       </AnimatePresence>
                       
                       {/* Dots Navigation */}
                       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-neutral-100/80 px-3 py-1.5 rounded-full backdrop-blur-sm border border-neutral-200">
                          {activeResearch.images.map((_, idx) => (
                              <button 
                                 key={idx}
                                 onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                 className={`h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-primary w-6' : 'bg-neutral-400 w-2 hover:bg-primary/50'}`}
                              />
                          ))}
                       </div>
                   </div>
                ) : (
                    <img 
                      src={activeResearch.image || "/SRL Logo.webp"} 
                      alt={activeResearch.title} 
                      className="w-full h-full object-contain rounded-[2rem]"
                    />
                )}
            </div>

            {/* RIGHT PANEL: CONTENT */}
            <div className="lg:col-span-3 flex flex-col h-full overflow-y-auto custom-scrollbar relative bg-white">
            
            {/* Modal Header */}
            <div className="px-8 sm:px-12 pt-10 sm:pt-14 pb-6 bg-gradient-to-b from-neutral-50 to-white">
                <span className={`
                  inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase
                  ${activeResearch.status === 'Ongoing' ? 'bg-primary/10 text-primary' : 'bg-neutral-100 text-neutral-500'}
                `}>
                  {activeResearch.status} Project
                </span>
                
                <h3 className="text-3xl sm:text-5xl font-black text-neutral-900 leading-tight">
                  {activeResearch.title}
                </h3>
            </div>

            {/* Content Wrapper */}
            <div className="px-8 sm:px-12 pb-10 sm:pb-14">
                
                {activeResearch.papers ? (
                  /* MULTI-PAPER LAYOUT */
                  <div className="space-y-16">
                     <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-light max-w-3xl">
                        {activeResearch.description}
                     </p>
                     
                     {activeResearch.papers.map((paper, index) => (
                        <div key={index} className="relative pl-6 sm:pl-8 border-l-2 border-primary/20">
                            <h4 className="text-2xl font-bold text-neutral-800 mb-3">
                              {paper.title}
                            </h4>
                            <p className="text-base text-neutral-600 mb-8 max-w-2xl leading-relaxed">
                              {paper.description}
                            </p>

                            <div className="bg-neutral-50/50 rounded-2xl p-6 border border-neutral-100">


                                <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                                  Paper Team
                                </h5>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {paper.members.map((member) => (
                                        <div
                                          key={member.name}
                                          className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-100 shadow-sm"
                                        >
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200">
                                               <img 
                                                  src={member.image || "https://ui-avatars.com/api/?name=" + member.name} 
                                                  alt={member.name} 
                                                  className="w-full h-full object-cover"
                                               />
                                            </div>
                                             <div>
                                               <p className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                                                  {member.name}
                                                  {member.role && (
                                                     <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wide">
                                                        {member.role}
                                                     </span>
                                                  )}
                                               </p>
                                               <p className="text-[10px] text-neutral-500 font-medium">
                                                  {[member.branch, member.semester, member.college].filter(Boolean).join(" • ")}
                                               </p>
                                               {/* Contact Icons */}
                                               <div className="flex gap-2 mt-1.5">
                                                  {member.email && (
                                                    <a href={`mailto:${member.email}`} className="p-2 rounded-full bg-white text-neutral-400 hover:text-primary hover:bg-primary/5 transition-all" title="Email">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                    </a>
                                                  )}
                                                  {member.linkedin && (
                                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white text-neutral-400 hover:text-[#0077b5] hover:bg-[#0077b5]/5 transition-all" title="LinkedIn">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                                    </a>
                                                  )}
                                               </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                     ))}
                  </div>
                ) : (
                  /* SINGLE PROJECT LAYOUT (Original) */
                  <>
                    <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-light mb-12 max-w-3xl">
                      {activeResearch.description}
                    </p>
        
                    {/* Guided By Section */}
                    {activeResearch.guidedBy && (
                       <div className="mb-12 p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-start sm:items-center gap-4">
                          <div className="p-3 bg-white rounded-full text-primary shadow-sm">
                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                             </svg>
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1">
                                Guided By
                             </h4>
                             <p className="text-lg font-bold text-neutral-900">
                                {activeResearch.guidedBy}
                             </p>
                             {activeResearch.guideRole && (
                                <p className="text-sm text-neutral-600 font-medium">
                                   {activeResearch.guideRole}
                                </p>
                             )}
                          </div>
                       </div>
                    )}

                    {/* Team Section */}
                    <div className="border-t border-dashed border-neutral-200 pt-10">
                      <h4 className="flex items-center gap-3 text-sm font-bold text-neutral-400 uppercase tracking-widest mb-8">
                        <span className="w-2 h-2 rounded-full bg-primary/40"></span>
                        Research Team
                      </h4>
        
                      <div className="grid gap-4 sm:grid-cols-2">
                  {activeResearch.members.map((member) => (
                    <div
                      key={member.name}
                      className="
                        group
                        flex items-center justify-between
                        p-4 rounded-2xl
                        bg-neutral-50 border border-neutral-100
                        hover:bg-white hover:border-primary/20 hover:shadow-lg
                        transition-all duration-300
                      "
                    >
                      <div className="flex items-center gap-4">
                        {/* AVATAR */}
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-neutral-200 group-hover:border-primary/30 transition-colors">
                            <img 
                              src={member.image || "https://ui-avatars.com/api/?name=" + member.name} 
                              alt={member.name} 
                              className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <p className="font-bold text-base text-neutral-900 group-hover:text-primary transition-colors flex items-center gap-2">
                                {member.name}
                                {member.role && (
                                   <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wide">
                                      {member.role}
                                   </span>
                                )}
                            </p>
                            <p className="text-xs text-neutral-500 font-medium">
                               {[member.branch, member.semester, member.college].filter(Boolean).join(" • ")}
                            </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {/* Simple Icon Links */}
                        <a href={`mailto:${member.email}`} className="p-2 rounded-full bg-white text-neutral-400 hover:text-primary hover:bg-primary/5 transition-all" title="Email">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </a>
                        <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white text-neutral-400 hover:text-[#0077b5] hover:bg-[#0077b5]/5 transition-all" title="LinkedIn">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                    </div>
                  </>
                )}
            </div>
            </div>
            
            {/* Close Button Absolute */}
            <button 
               onClick={closeModal} 
               className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-500"
            >
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
};

export default ResearchAreas;
