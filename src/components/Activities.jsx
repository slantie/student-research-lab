import Pic3 from "../assets/gallery/Pic3.png";
import { useState, useEffect, useRef } from "react";
import Photo1 from "../assets/gallery/Photo1.webp";
import Photo2 from "../assets/gallery/Photo2.webp";
import Photo3 from "../assets/gallery/Photo3.webp";
import Photo4 from "../assets/gallery/Photo4.webp";
import Pic2 from "../assets/gallery/pic2.png";
import Pic1 from "../assets/gallery/pic1.png";
import Pic4 from "../assets/gallery/pic4.png";

const Activities = () => {
	const [activeItem, setActiveItem] = useState(null);
	const [isPopupVisible, setIsPopupVisible] = useState(false);

	const galleryItems = [
		{
			title: "Faculty-Led Research Sessions",
			description: "Guided research discussions and mentoring sessions conducted by experienced faculty members.",
			image: Pic2,
			year: 2026,
			link: "https://www.linkedin.com/posts/mmpsrpc_ksv-svkm-mmpsrpc-activity-7417800043421843456-rV2a?utm_source=share&utm_medium=member_desktop&rcm=ACoAADKU7EwBd6ANuk69I1ptc1jInauK8Qjbvhc",
			brief: "At the Students Research Lab under the M. M. Patel Students Research Project Cell (KSV-MMPSRPC), Kadi Sarva Vishwavidyalaya, Gandhinagar, a research-oriented session was conducted focusing on algorithm optimization within a problem-driven research framework.Thesession emphasized analytical thinking, performance evaluation, and methodological refinement of algorithms. Students engaged in structured discussions, comparative analysis of algorithmic approaches, and collaborative exploration of optimization techniques aligned with research standards.The activity aimed to cultivate research aptitude by strengthening logical rigor, encouraging evidence-based reasoning, and promoting a systematic, experimentation-focused approach to computational problem solving.",
			date: "3 January 2026",
		},
		// Alumni Connect Session (2025) removed
		{
			title: "Technical Enrichment ",
			description: "Team-based activities designed to promote collaboration and problem-solving skills.",
			image: Pic1,
			year: 2026,
			link: "https://www.linkedin.com/posts/mmpsrpc_mmpsrpc-ksv-svkm-activity-7411274469664759809-rDsK?utm_source=share&utm_medium=member_desktop&rcm=ACoAADKU7EwBd6ANuk69I1ptc1jInauK8Qjbvhc",
			brief:"The session encouraged students to apply concepts through discussion and collaborative team work.The activity helped students strengthen understanding logical concepts and develop a structured approach to problem solving.At KSV, the Students Research Lab continues to nurture a dynamic academic environment one that consistently sharpens minds and promotes 360° student development across disciplines.",
			date: "1mo ago",
		},
		{
			title: "Innovation Hackathon",
			description: "A 24-hour hackathon where students build prototypes to solve real-world problems.",
			image: Pic3,
			year: 2026,
			link: "https://example.com/hackathon",
			brief: "Students innovate and build solutions in a time-bound event.",
			date: "10 & 11 January 2026",
		},
		// Industry Expert Talk (2025) removed
		{
			title: "Active research culture",
			description: "showcases the active vulture at SRL - A new Beginning of MMPSRPC",
			image: Photo3,
			year: 2025,
			link: "https://www.linkedin.com/posts/mmpsrpc_mmpsrpc-ksv-svkm-activity-7403658696884412416-BWwn?utm_source=share&utm_medium=member_desktop&rcm=ACoAADKU7EwBd6ANuk69I1ptc1jInauK8Qjbvhc",
			brief: "Inside this lab, students are not just creating projects; they are nurturing a research-driven approach where ideas develop with purpose, conversations bring clarity, and collaboration happens naturally as students learn from one another’s strengths.",
			date: "2mo ago",
		},
		// Robotics Workshop (2022) removed
		{
			title: "Alumni Meet",
			description: "Connecting with past students to build a strong professional network.",
			image: Pic4,
			year: 2026,
			link: "https://example.com/alumni-meet",
			brief: "An event to connect current students with alumni for networking.",
			// date removed
		},
		{
			title: "Weekly Exercise Debate Sessions",
			description: "Students evolving out of routine academics",
			image: Photo2,
			year: 2025,
			link: "https://www.linkedin.com/posts/mmpsrpc_mmpsrpc-ksv-studentsresearchlab-activity-7405172370459668481-6zQI?utm_source=share&utm_medium=member_desktop&rcm=ACoAADKU7EwBd6ANuk69I1ptc1jInauK8Qjbvhc",
			brief: "Students Research Lab shows students steadily moving beyond routine academic thinking. Weekly topics and spontaneous exercises encourage sharper reasoning, and deeper engagement with ideas, all of which strengthen their research mindset.",
			date: "2mo ago",
		},
	];

	const groupedItems = galleryItems.reduce((acc, item) => {
		(acc[item.year] = acc[item.year] || []).push(item);
		return acc;
	}, {});


	const sortedYears = Object.keys(groupedItems).sort((a, b) => b - a);

	/* ESC closes popup */
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") closePopup();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	const [popupBorderColor, setPopupBorderColor] = useState("#8884FF");
	const colorIntervalRef = useRef(null);

	function getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	const openPopup = (item) => {
		setActiveItem(item);
		setPopupBorderColor(getRandomColor());
		requestAnimationFrame(() => setIsPopupVisible(true));
	};

	// Animate border color while popup is open
	useEffect(() => {
		if (isPopupVisible) {
			colorIntervalRef.current = setInterval(() => {
				setPopupBorderColor(getRandomColor());
			}, 1200); // Change color every 1.2s
		} else {
			clearInterval(colorIntervalRef.current);
		}
		return () => clearInterval(colorIntervalRef.current);
	}, [isPopupVisible]);

	const closePopup = () => {
		setIsPopupVisible(false);
		setTimeout(() => setActiveItem(null), 300);
	};

	return (
		<section
			id="activities"
			className="
				pt-8 sm:pt-12
				pb-10 sm:pb-16
				px-4 sm:px-6 lg:px-8
				overflow-x-hidden
			"
		>
			<div className="max-w-7xl mx-auto">
				<div className="rounded-2xl bg-white px-6 sm:px-10 lg:px-16 py-8 sm:py-12">

					{/* HEADER — CENTER ALIGNED */}
					<div className="mb-10 sm:mb-16 max-w-2xl mx-auto text-center">
						<h2 className="text-3xl sm:text-4xl font-bold mb-3">
							Activities
						</h2>
						<p className="text-sm sm:text-base text-neutral-600">
							A glimpse into workshops, research sessions, and collaborative
							learning experiences at the Student Research Lab.
						</p>
					</div>

					{/* YEAR SECTIONS */}
					<div className="space-y-16">
						{sortedYears.map((year) => (
							<div key={year}>
								{/* YEAR HEADER */}
								<div className="flex items-center gap-4 mb-8">
									<span className="text-2xl sm:text-3xl font-bold text-neutral-800">
										{year}
									</span>
									<div className="h-px bg-neutral-200 flex-1 relative top-1"></div>
								</div>

								{/* MASONRY GRID FOR THIS YEAR */}
								<div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
									{groupedItems[year].map((item, i) => (
													<div
														key={i}
														onClick={() => openPopup(item)}
														className="
															break-inside-avoid
															mb-4
															cursor-pointer
															group
															rounded-xl
															overflow-hidden
															bg-neutral-50
															transition-all
															duration-300
															hover:shadow-lg
															hover:-translate-y-1
															glow-on-hover
														"
													>
											<img
												src={item.image}
												alt={item.title}
												className="w-full h-auto object-cover"
											/>
                      
											<div className="p-4">
												 {item.date && (
													 <div className="text-xs text-neutral-500 font-medium mb-1 uppercase tracking-wider">
														 {item.date}
													 </div>
												 )}
												 <h3 className="text-base font-semibold text-neutral-800 mb-1 group-hover:text-primary transition-colors">
													 {item.title}
												 </h3>
												 <p className="text-sm text-neutral-500 line-clamp-2">
													 {item.description}
												 </p>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>

				</div>
			</div>

			{/* POPUP */}
			{activeItem && (
				<div
					onClick={closePopup}
					className={`
						fixed inset-0 z-50
						flex items-center justify-center
						px-4 sm:px-6
						transition-all duration-300 ease-out
						${isPopupVisible ? "bg-black/60 backdrop-blur-sm opacity-100" : "bg-black/0 opacity-0"}
					`}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className={`
							bg-white rounded-2xl
							max-w-5xl w-full
							grid grid-cols-1 md:grid-cols-2
							overflow-hidden
							transform transition-all duration-300 ease-out
							${isPopupVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
						`}
						style={{
							border: '4px solid #00F0FF',
							  boxShadow: '0 0 12px 2px #00F0FF, 0 0 18px 4px #00BFFF, 0 0 24px 6px #00F0FF',
							background: '#fff',
						}}
					>
						<div className="bg-neutral-100 flex items-center justify-center">
							<img
								src={activeItem.image}
								alt={activeItem.title}
								className="w-full h-full max-h-[70vh] object-contain"
							/>
						</div>

						<div className="px-6 py-6 sm:px-10 sm:py-8 flex flex-col justify-center">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-xl sm:text-2xl font-semibold">
									{activeItem.title}
								</h3>
								<span className="text-sm font-medium px-3 py-1 bg-neutral-100 rounded-full text-neutral-600">
									{activeItem.year}
								</span>
							</div>
							{/* Description removed as per request */}
							<a
								href={activeItem.link}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-primary underline font-medium mb-2"
							>
								{/* LinkedIn SVG Icon */}
								<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#0077B5' }}>
									<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.041 0 3.604 2.002 3.604 4.604v5.592z"/>
								</svg>
								View Post
							</a>
							<div className="text-neutral-700 text-sm mb-2">
								<strong>Brief:</strong> {activeItem.brief}
							</div>
							{activeItem.date && (
								<div className="text-neutral-500 text-sm mt-4 italic">
									{activeItem.date}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default Activities;
