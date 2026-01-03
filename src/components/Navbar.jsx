import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Research", id: "research" },
    { label: "Gallery", id: "gallery" },
    { label: "Researchers", id: "team" },
    { label: "Join Us", id: "join" },
  ];

  const handleScroll = (id) => {
    setOpen(false);
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#DDE8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* LEFT — SRL Identity */}
          <div
            className="flex items-center gap-2 cursor-pointer shrink-0"
            onClick={() => handleScroll("home")}
          >
            <img
              src="/SRL Logo.png"
              alt="SRL"
              className="h-12 sm:h-12 object-contain"
            />
            <span className="hidden sm:block text-base sm:text-lg font-semibold text-[#1F1F1F]">
              Student Research Lab
            </span>
          </div>

          {/* CENTER — DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScroll(item.id)}
                className="
                  relative
                  font-medium
                  text-[#1F1F1F]/90
                  transition-colors
                  hover:text-black
                  after:content-['']
                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:h-[2px]
                  after:w-full
                  after:bg-[#5EEAD4]
                  after:scale-x-0
                  after:origin-left
                  after:transition-transform
                  after:duration-300
                  hover:after:scale-x-100
                "
              >
                {item.label}
              </button>
            ))}

            <a
              href="https://appointment.mmpsrpc.in/student"
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-4 py-2
                rounded-full
                bg-[#134E4A]
                text-[#DDE8E3]
                font-medium
                hover:bg-[#3A3A35]
                transition
              "
            >
              Appointment
            </a>
          </div>

          {/* RIGHT — INSTITUTIONAL LOGOS (ALWAYS VISIBLE) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <img
              src="/MMPSRPC Logo.png"
              alt="MMPSRPC"
              className="h-12 sm:h-12 object-contain"
            />
            <img
              src="/svkm.png"
              alt="SVKM"
              className="h-12 sm:h-12 object-contain"
            />
            <img
              src="/KSV Logo.png"
              alt="KSV"
              className="h-12 sm:h-12 object-contain"
            />
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="lg:hidden text-[#1F1F1F]"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  open
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-[#DDE8E3] border-t border-[#C8D6D0]">
          <div className="flex flex-col px-6 py-6 gap-4">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScroll(item.id)}
                className="text-left font-medium text-[#1F1F1F]"
              >
                {item.label}
              </button>
            ))}

            <a
              href="https://appointment.mmpsrpc.in/student"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-4
                inline-flex
                justify-center
                px-5 py-3
                rounded-full
                bg-[#1F1F1F]
                text-[#DDE8E3]
                font-medium
              "
            >
              Appointment
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
