import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { researchWorks } from "../data/researchData";

const ResearchAreas = () => {
  const [activeResearch, setActiveResearch] = useState(null);

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
        pt-20 sm:pt-24
        pb-24 sm:pb-32
        px-4 sm:px-6 lg:px-8
        relative
        overflow-hidden
      "
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
         <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
         <div className="absolute bottom-[10%] right-[5%] w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black mb-6 text-neutral-900 tracking-tight leading-tight">
            Research Frontiers
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
            Explorations at the intersection of technology and theory.
            Our students are pushing boundaries in these key areas.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {researchWorks.map((work) => {
            const isOngoing = work.status === "Ongoing";

            return (
              <div
                key={work.title}
                onClick={() => openModal(work)}
                className="
                  group relative cursor-pointer
                  rounded-3xl
                  p-8 sm:p-10
                  bg-white
                  border border-neutral-100
                  shadow-sm hover:shadow-2xl
                  transition-all duration-500 ease-out
                  hover:-translate-y-2
                  overflow-hidden
                "
              >
                {/* DECORATIVE GRADIENT BLOB */}
                <div className="
                   absolute -right-20 -top-20 w-64 h-64 
                   bg-gradient-to-br from-primary/5 to-transparent 
                   rounded-full blur-3xl 
                   group-hover:scale-150 transition-transform duration-700 ease-in-out
                "></div>

                {/* STATUS PILL */}
                <div className="relative mb-8">
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

                <h3 className="relative text-2xl sm:text-3xl font-black text-neutral-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  {work.title}
                </h3>

                <p className="relative text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
                  {work.short}
                </p>
                
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
                   <span>Explore Research</span>
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
              w-full max-w-4xl
              bg-white
              rounded-[2.5rem]
              shadow-2xl
              overflow-hidden
              flex flex-col
              max-h-[90vh]
            "
          >
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

            {/* Scrollable Content */}
            <div className="px-8 sm:px-12 pb-10 sm:pb-14 overflow-y-auto custom-scrollbar">
                <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-light mb-12 max-w-3xl">
                  {activeResearch.description}
                </p>
    
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
                        <p className="font-bold text-base text-neutral-900 group-hover:text-primary transition-colors">{member.name}</p>
                        <p className="text-xs text-neutral-500 font-medium">{member.branch} • {member.semester}</p>
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
