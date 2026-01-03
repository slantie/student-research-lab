const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">

      {/* Logo from public folder */}
      <img
        src="/SRL Logo.png"   // make sure filename matches
        alt="MMPSRPC"
        className="w-40 heartbeat-ultra"
      />

      {/* Ultra-smooth heartbeat animation */}
      <style>
        {`
          .heartbeat-ultra {
            animation: heartbeatUltra 2.4s cubic-bezier(0.45, 0, 0.55, 1) infinite;
            transform-origin: center;
            will-change: transform, opacity;
          }

          @keyframes heartbeatUltra {
            0% {
              transform: scale(1);
              opacity: 0.96;
            }
            15% {
              transform: scale(1.03);
              opacity: 1;
            }
            28% {
              transform: scale(1.015);
            }
            42% {
              transform: scale(1.05);
            }
            58% {
              transform: scale(1.025);
            }
            72% {
              transform: scale(1.01);
              opacity: 0.98;
            }
            100% {
              transform: scale(1);
              opacity: 0.96;
            }
          }
        `}
      </style>

    </div>
  );
};

export default Preloader;
