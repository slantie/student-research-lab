import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Custom SVG Icons for Objectives
const Icon360 = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
    </svg>
);

const IconTeam = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const IconHandsOn = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1 2.83 0l.3.3a2 2 0 0 1 0 2.83l-8.1 8.1a2 2 0 0 1-2.83 0l-1.6-1.6a2 2 0 0 1 0-2.83l8.1-8.1a2 2 0 0 1 2.83 0l.3.3a2 2 0 0 1 0 2.83l-3.77 3.77" />
        <path d="m14.7 6.3-3.6 3.6" />
        <circle cx="5" cy="19" r="2" />
        <path d="M3.5 17.5 2 16" />
        <path d="M6.5 20.5 8 22" />
    </svg>
);

const IconResearch = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M11 7v8" />
        <path d="M7 11h8" />
    </svg>
);

const IconTheory = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

const IconMentors = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const IconInnovation = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10">
        <path d="M12 2v4" />
        <path d="m4.93 4.93 2.83 2.83" />
        <path d="M2 12h4" />
        <path d="m4.93 19.07 2.83-2.83" />
        <path d="M12 22v-4" />
        <path d="m19.07 19.07-2.83-2.83" />
        <path d="M22 12h-4" />
        <path d="m19.07 4.93-2.83 2.83" />
    </svg>
);

const IconSkills = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10">
        <path d="m12 14 4-4" />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
);

const IconGlobal = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M22 12A10 10 0 1 1 2 12" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

const IconReady = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
);

const objectives = [
    {
        id: 1,
        icon: <Icon360 />,
        title: "360° Development of Students",
        description: "To cultivate well-rounded, future-ready achievers equipped to excel beyond boundaries.",
        color: "teal"
    },
    {
        id: 2,
        icon: <IconTeam />,
        title: "Team-Based Learning",
        description: "To promote teamwork through group research projects, innovation activities, and collaborative problem-solving.",
        color: "cyan"
    },
    {
        id: 3,
        icon: <IconHandsOn />,
        title: "Hands-on Experience",
        description: "To encourage practical experimentation and hands-on technical sessions, ensuring students develop expertise.",
        color: "sky"
    },
    {
        id: 4,
        icon: <IconResearch />,
        title: "Interdisciplinary Research",
        description: "Addressing emerging technologies and societal challenges through cross-domain collaboration.",
        color: "blue"
    },
    {
        id: 5,
        icon: <IconTheory />,
        title: "Bridging Theory & Practice",
        description: "Connecting academic learning with real-world engineering through continuous technical engagement.",
        color: "indigo"
    },
    {
        id: 6,
        icon: <IconMentors />,
        title: "Guided Mentorship",
        description: "Fostering professional growth and character building under the expert guidance of dedicated faculty mentors.",
        color: "purple"
    },
    {
        id: 7,
        icon: <IconInnovation />,
        title: "Applied Innovation",
        description: "Focusing on solution-oriented research and technological advancements that address practical industrial needs.",
        color: "fuchsia"
    },
    {
        id: 8,
        icon: <IconSkills />,
        title: "Professional Excellence",
        description: "Developing a mindset of quality, ethics, and competitive technical standards among all lab members.",
        color: "pink"
    },
    {
        id: 9,
        icon: <IconGlobal />,
        title: "Global Recognition",
        description: "Striving for excellence that places our research and students on the international stage.",
        color: "rose"
    },
    {
        id: 10,
        icon: <IconReady />,
        title: "Industry Readiness",
        description: "Equipping students with the skills and confidence required to transition seamlessly into high-impact roles.",
        color: "orange"
    }
];

const getColorClasses = (color) => {
    // A simplified map to avoid dynamic class purge issues if not safely listed,
    // though Tailwind JIT usually handles dynamic template literals if values are safe.
    // For safety, defining explicit maps or standardizing on neutral/primary is often cleaner,
    // but preserving the rainbow effect as requested by original design.
    const colors = {
        teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-800", icon: "text-teal-600", hover: "group-hover:border-teal-300" },
        cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-800", icon: "text-cyan-600", hover: "group-hover:border-cyan-300" },
        sky: { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-800", icon: "text-sky-600", hover: "group-hover:border-sky-300" },
        blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", icon: "text-blue-600", hover: "group-hover:border-blue-300" },
        indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-800", icon: "text-indigo-600", hover: "group-hover:border-indigo-300" },
        purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800", icon: "text-purple-600", hover: "group-hover:border-purple-300" },
        fuchsia: { bg: "bg-fuchsia-50", border: "border-fuchsia-200", text: "text-fuchsia-800", icon: "text-fuchsia-600", hover: "group-hover:border-fuchsia-300" },
        pink: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-800", icon: "text-pink-600", hover: "group-hover:border-pink-300" },
        rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-800", icon: "text-rose-600", hover: "group-hover:border-rose-300" },
        orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", icon: "text-orange-600", hover: "group-hover:border-orange-300" },
    };
    return colors[color] || colors.teal;
};

const ObjectiveCard = ({ objective, index }) => {
    const theme = getColorClasses(objective.color);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`
                group
                relative
                p-6 sm:p-8
                rounded-2xl
                bg-white
                border border-transparent
                ${theme.border}
                ${theme.bg}
                hover:shadow-lg
                hover:-translate-y-1
                transition-all duration-300
                flex flex-col sm:flex-row items-start gap-4 sm:gap-6
            `}
        >
            {/* Number Watermark */}
            <div className={`absolute top-4 right-6 text-6xl font-black opacity-[0.07] ${theme.text} pointer-events-none select-none`}>
                {objective.id}
            </div>

            {/* Icon */}
            <div className={`
                p-3 rounded-xl bg-white shadow-sm border ${theme.border} 
                ${theme.icon} shrink-0
                group-hover:scale-110 transition-transform duration-300
            `}>
                {objective.icon}
            </div>

            {/* Content */}
            <div className="relative z-10">
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${theme.text}`}>
                    {objective.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                    {objective.description}
                </p>
            </div>
        </motion.div>
    );
};

const Objectives = () => {
    return (
        <section id="objectives" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1400px] mx-auto">
                
                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6 tracking-tight">
                        Objectives of SRL
                    </h2>
                    <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
                        Pioneering excellence through a structured mission focused on innovation, 
                        growth, and proper student empowerment in research.
                    </p>
                </div>

                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {objectives.map((obj, index) => (
                        <ObjectiveCard key={obj.id} objective={obj} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Objectives;
