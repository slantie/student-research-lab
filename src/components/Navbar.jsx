import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Research", path: "/research" },
    { label: "Gallery", path: "/gallery" },
    { label: "Researchers", path: "/team" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px]">
        <div className="flex items-center h-full relative">

          {/* LEFT — SRL Identity */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/SRL Logo.webp"
              alt="SRL"
              className="h-10 sm:h-11 object-contain"
            />
            <span className="hidden sm:block text-base sm:text-lg font-semibold text-white">
              Student Research Lab
            </span>
          </Link>

          {/* CENTER — DESKTOP MENU */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `
                    relative
                    font-medium
                    text-white/90
                    transition-colors
                    hover:text-white

                    lg:after:content-['']
                    lg:after:block
                    lg:after:absolute
                    lg:after:left-0
                    lg:after:-bottom-1
                    lg:after:h-[2.5px]
                    lg:after:w-full
                    lg:after:bg-white/70
                    lg:after:rounded-xl
                    lg:after:origin-left
                    lg:after:transition-transform
                    lg:after:duration-300

                    lg:hover:after:scale-x-100
                    ${isActive ? "lg:after:scale-x-100 text-white" : "lg:after:scale-x-0"}
                  `
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* APPOINTMENT BUTTON */}
            <a
              href="https://appointment.mmpsrpc.in/student"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white text-primary font-medium hover:opacity-90 transition"
            >
              Appointment
            </a>
          </div>

          {/* RIGHT — LOGOS */}
          <div className="ml-auto hidden sm:flex items-center gap-3 sm:gap-4 shrink-0">
            <img src="/MMPSRPC Logo.webp" alt="MMPSRPC" className="h-10 sm:h-11" />
            <img src="/svkm.webp" alt="SVKM" className="h-10 sm:h-11" />
            <img src="/KSV Logo.webp" alt="KSV" className="h-10 sm:h-11" />
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="lg:hidden ml-auto text-white"
            onClick={() => setOpen((v) => !v)}
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
      <div
        className={`lg:hidden bg-primary border-t border-white/10 transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive ? "text-white" : "text-white/80"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <a
            href="https://appointment.mmpsrpc.in/student"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex justify-center px-5 py-3 rounded-full bg-white text-primary font-medium hover:opacity-90 transition"
          >
            Appointment
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
