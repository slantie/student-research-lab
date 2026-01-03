const Footer = () => {
  return (
    <footer className="relative">
      {/* SOFT CURVE */}
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="absolute -top-[39px] left-0 w-full h-[40px]"
      >
        <path
          d="
            M0,34
            Q720,0 1440,34
            L1440,40
            L0,40
            Z
          "
          fill="#cfded8"
        />
      </svg>

      {/* FOOTER BODY */}
      <div className="bg-[#cfded8] text-[#134E4A] relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            {/* SRL BRAND */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/SRL Logo.png"
                alt="Student Research Lab"
                className="h-14 scale-[1.90] mb-8"
              />

              <p className="text-[#134E4A]/80 leading-relaxed text-xs max-w-[240px]">
                Student Research Lab (SRL) encourages innovation, collaboration,
                and applied research through guided academic mentorship.
              </p>
            </div>

            {/* QUICK LINKS — 2×2 GRID */}
            <div>
              <h4 className="font-semibold mb-3 uppercase tracking-wide text-xs">
                Quick Links
              </h4>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-[#134E4A]/80">
                <a href="#home" className="hover:underline">
                  Home
                </a>
                <a href="#about" className="hover:underline">
                  About
                </a>
                <a href="#research" className="hover:underline">
                  Research
                </a>
                <a href="#gallery" className="hover:underline">
                  Gallery
                </a>
                <a href="#team" className="hover:underline">
                  Team
                </a>
                <a href="#join" className="hover:underline">
                  Join Us
                </a>
                <a
                  href="https://appointment.mmpsrpc.in/student"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Appointment
                </a>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </div>
            </div>

            {/* CONTACT — SIMPLE & CLEAN */}
            <div>
              <h4 className="font-semibold mb-3 uppercase tracking-wide text-xs">
                Contact
              </h4>

              <p className="text-xs text-[#134E4A]/80 leading-relaxed mb-2">
                M. M. Patel Students Research Project Cell
                <br />
                KSV University, Gandhinagar, Gujarat, India
              </p>

              <div className="flex items-center gap-2 text-xs text-[#134E4A]/80 mb-1">
                {/* Phone Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M5 4h4l2 5-2 2a12 12 0 0 0 6 6l2-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
                <span>079-232-44690</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#134E4A]/80">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mmpsrc.ksv@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-[#134E4A]/80 hover:underline"
                >
                  {/* Email Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="w-4 h-4"
                  >
                    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                  <span>mmpsrc.ksv@gmail.com</span>
                </a>
              </div>
            </div>

            {/* FOLLOW */}
            <div>
              <h4 className="font-semibold mb-3 uppercase tracking-wide text-xs">
                Follow Us
              </h4>

              <a
                href="https://www.linkedin.com/company/mmpsrpc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#134E4A]/80 hover:underline"
              >
                {/* LinkedIn Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>@mmpsrpc</span>
              </a>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-[#134E4A]/20 my-5"></div>

          {/* COPYRIGHT */}
          <div className="text-center text-[11px] text-[#134E4A]/70">
            © {new Date().getFullYear()} Student Research Lab · MMPSRPC, KSV
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
