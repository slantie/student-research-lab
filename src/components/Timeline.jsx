import { motion } from "framer-motion";

// Inline SVG Icons
const RocketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const TrophyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const MedalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
    <path d="M11 12 5.12 2.2" />
    <path d="m13 12 5.88-9.8" />
    <path d="M8 7h8" />
    <circle cx="12" cy="17" r="5" />
    <path d="M12 18v-2h-.5" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const timelineSteps = [
  {
    step: "Nov 2025",
    title: "Marked The Beginning",
    description: "The origin of SRL, where innovation and research journey began.",
    icon: <RocketIcon />,
  },
  {
    step: "Dec 2025",
    title: "Alumni Meet",
    description: "An interactive gathering where alumni reconnect, share experiences, and inspire SRL members with their journeys and insights.",
    icon: <MedalIcon />,
  },
  {
    step: "Jan 2026",
    title: "ImpactThon & InnovAItion Finalists",
    description: "SRL students became finalists in an InnovAItion hackathon and successfully organized ImpactThon promoting Research | Prototype | Impact.",
    icon: <GlobeIcon />,
  },
  {
    step: "Feb 2026",
    title: "Bridging Theory & Practice",
    description: "A research talk focused on connecting academic concepts with real-world applications through insights, discussions, and practical perspectives.",
    icon: <TrophyIcon />,
  },
];

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const popIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.2 } 
  },
};

const TimelineItem = ({ item, index }) => {
  const isEvenStep = (index + 1) % 2 === 0;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={itemVariants}
      className="relative flex items-center justify-between w-full mb-12 sm:mb-24 flex-col-reverse sm:flex-row z-10"
    >
      {/* LEFT SIDE (Desktop) */}
      <div className={`w-full sm:w-[45%] flex ${isEvenStep ? 'justify-end' : 'justify-end'}`}>
        {isEvenStep ? (
          // EVEN STEP (e.g., 2026): Show NUMBER on Left
          <motion.div variants={slideInLeft} className="text-center sm:text-right pr-0 sm:pr-8 hidden sm:block">
            <span className="text-5xl sm:text-8xl font-black text-teal-500 tracking-tighter select-none">
              {item.step}
            </span>
          </motion.div>
        ) : (
          // ODD STEP (e.g., 2025): Show CONTENT on Left
          <motion.div 
            variants={slideInLeft}
            className="text-center sm:text-right pr-0 sm:pr-8 group cursor-pointer"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* CENTER ICON */}
      <div className="relative z-10 flex items-center justify-center w-full sm:w-[10%] my-4 sm:my-0">
        <motion.div 
          variants={popIn}
          whileHover={{ scale: 1.15, rotate: 10 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-4 border-primary shadow-xl flex items-center justify-center text-primary z-20"
        >
           <div className="scale-110 sm:scale-125">
             {item.icon}
           </div>
        </motion.div>
        {/* Connector Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-[150%] sm:h-[180%] bg-neutral-100 -z-10" />
      </div>

      {/* RIGHT SIDE (Desktop) */}
      <div className={`w-full sm:w-[45%] flex ${isEvenStep ? 'justify-start' : 'justify-start'}`}>
        {isEvenStep ? (
          // EVEN STEP (e.g., 2026): Show CONTENT on Right
          <motion.div 
            variants={slideInRight} 
            className="text-center sm:text-left pl-0 sm:pl-8 group cursor-pointer"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-md">
              {item.description}
            </p>
          </motion.div>
        ) : (
          // ODD STEP (e.g., 2025): Show NUMBER on Right
          <motion.div variants={slideInRight} className="text-center sm:text-left pl-0 sm:pl-8 hidden sm:block">
            <span className="text-5xl sm:text-8xl font-black text-teal-500 tracking-tighter select-none">
              {item.step}
            </span>
          </motion.div>
        )}
      </div>
      
      {/* Mobile Number Display (Only visible on small screens) */}
      <motion.div variants={slideInLeft} className="sm:hidden text-4xl font-black text-primary/20 mb-2">
         {item.step}
      </motion.div>
    </motion.div>
  );
};

const Timeline = () => {
  return (
    <section className="py-16 sm:py-24 overflow-hidden overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16 sm:mb-24 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-3 text-neutral-900"
          >
            Our Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 text-lg sm:text-xl"
          >
            From humble beginnings to a hub of innovation, exploring the milestones that define our path forward.
          </motion.p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          <div className="flex flex-col">
            {timelineSteps.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Timeline;
