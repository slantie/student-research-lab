import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

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
                src="/SRL Logo.webp"
                alt="Student Research Lab"
                className="h-14 scale-[1.90] mb-8"
              />

              <p className="text-[#134E4A]/80 leading-relaxed text-xs max-w-[240px]">
                Student Research Lab (SRL) encourages innovation, collaboration,
                and applied research through guided academic mentorship.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h4 className="font-semibold mb-3 uppercase tracking-wide text-xs">
                Quick Links
              </h4>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-[#134E4A]/80">
                <Link to="/" onClick={scrollToTop} className="hover:underline">
                  Home
                </Link>

                <a href="#about" className="hover:underline">
                  About
                </a>

                <Link to="/research" onClick={scrollToTop} className="hover:underline">
                  Research
                </Link>

                <Link to="/gallery" onClick={scrollToTop} className="hover:underline">
                  Gallery
                </Link>

                <Link to="/team" onClick={scrollToTop} className="hover:underline">
                  Team
                </Link>

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

            {/* CONTACT */}
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
                <span>079-232-44690</span>
              </div>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=mmpsrc.ksv@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#134E4A]/80 hover:underline"
              >
                mmpsrc.ksv@gmail.com
              </a>
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
                className="text-xs text-[#134E4A]/80 hover:underline"
              >
                @mmpsrpc
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