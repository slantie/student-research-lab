import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Desktop hover state
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // Mobile toggle state
  const location = useLocation();

  const menuItems = [
    { label: "Home", path: "/" },
    {
      label: "About Us",
      path: "#",
      submenu: [
        { label: "MMPSRPC", path: "/about/mmpsrpc" },
        { label: "KSV", path: "/about/ksv" },
        { label: "SVKM", path: "/about/svkm" },
        { label: "Contact Us", path: "/about/contact" },
      ],
    },
    { label: "Research", path: "/research" },
    { label: "Gallery", path: "/gallery" },
    { label: "Researchers", path: "/team" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[88px]">
        <div className="flex items-center h-full relative">
          {/* LEFT — SRL Identity */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/SRL Logo.svg"
              alt="SRL"
              className="h-12 sm:h-14 object-contain"
            />
            <span className="hidden sm:block text-base sm:text-lg font-semibold text-white">
              Student Research Lab
            </span>
          </Link>

          {/* CENTER — DESKTOP MENU */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {menuItems.map((item) =>
              item.submenu ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className={`
                      relative font-medium transition-colors hover:text-white flex items-center gap-1
                      ${
                        dropdownOpen || location.pathname.startsWith("/about")
                          ? "text-white"
                          : "text-white/90"
                      }

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
                      ${
                        location.pathname.startsWith("/about")
                          ? "lg:after:scale-x-100"
                          : "lg:after:scale-x-0"
                      }
                    `}
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* DESKTOP DROPDOWN */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 origin-top ${
                      dropdownOpen
                        ? "opacity-100 scale-100 visible"
                        : "opacity-0 scale-95 invisible"
                    }`}
                  >
                    {item.submenu.map((subItem) =>
                      subItem.path.startsWith("/") ? (
                        <Link
                          key={subItem.label}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ) : (
                        <a
                          key={subItem.label}
                          href={subItem.path}
                          target={subItem.path.startsWith("http") ? "_blank" : "_self"}
                          rel={subItem.path.startsWith("http") ? "noopener noreferrer" : ""}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {subItem.label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              ) : (
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
              )
            )}

            {/* APPOINTMENTBUTTON */}
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
            <img src="/MMPSRPC Logo.webp" alt="MMPSRPC" className="h-12 sm:h-14" />
            <img src="/svkm.webp" alt="SVKM" className="h-12 sm:h-14" />
            <img src="/KSV Logo.webp" alt="KSV" className="h-12 sm:h-14" />
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
          open ? "max-h-screen opacity-100 visible pointer-events-auto" : "max-h-0 opacity-0 invisible pointer-events-none overflow-hidden"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-4 overflow-y-auto max-h-[calc(100vh-88px)]">
          {menuItems.map((item) =>
            item.submenu ? (
              <div key={item.label} className="border-b border-white/10 pb-2">
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="w-full flex items-center justify-between font-medium text-white/80 mb-2"
                >
                  {item.label}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`flex flex-col gap-2 pl-4 overflow-hidden transition-all duration-300 ${
                    mobileDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.submenu.map((subItem) => (
                    subItem.path.startsWith("/") ? (
                      <Link
                        key={subItem.label}
                        to={subItem.path}
                        onClick={() => setOpen(false)}
                        className="text-white/70 hover:text-white text-sm py-1"
                      >
                        {subItem.label}
                      </Link>
                    ) : (
                      <a
                        key={subItem.label}
                        href={subItem.path}
                        target={subItem.path.startsWith("http") ? "_blank" : "_self"}
                        rel={subItem.path.startsWith("http") ? "noopener noreferrer" : ""}
                        onClick={() => setOpen(false)}
                        className="text-white/70 hover:text-white text-sm py-1"
                      >
                        {subItem.label}
                      </a>
                    )
                  ))}
                </div>
              </div>
            ) : (
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
            )
          )}

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
