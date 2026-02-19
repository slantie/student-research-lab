import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="bg-neutral-50 min-h-screen pt-12 pb-20">
      
      {/* HEADER SECTION */}
      <div className="bg-primary pt-20 pb-20 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl lg:text-6xl font-bold text-white mb-6"
            >
                Contact Us
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto"
            >
                Get in touch with the Student Research Lab. We are always open to questions, collaborations, and new ideas.
            </motion.p>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 lg:-mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* LEFT COLUMN: CONTACT DETAILS */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2 bg-white rounded-3xl p-8 lg:p-10 shadow-xl self-start"
            >
                <h2 className="text-2xl font-bold text-neutral-800 mb-6">Contact Information</h2>
                
                <div className="space-y-8">
                    {/* ADDRESS */}
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-neutral-800 mb-1">Visit Us</h3>
                            <p className="text-neutral-600 leading-relaxed">
                                Student Research Lab (MMPSRPC), <br/>
                                LDRP Institute of Technology and Research,<br/>
                                Sector-15, Gandhinagar - 382015,<br/>
                                Gujarat, India.
                            </p>
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-neutral-800 mb-1">Email Us</h3>
                            <a href="mailto:srl@ldrp.ac.in" className="text-primary hover:underline font-medium block">srl@ldrp.ac.in</a>
                            <a href="mailto:mmpsrc.ksv@gmail.com" className="text-primary hover:underline font-medium block mt-1">mmpsrc.ksv@gmail.com</a>
                        </div>
                    </div>

                    {/* APPOINTMENT BUTTON */}
                     <div className="pt-4">
                        <a 
                            href="https://appointment.mmpsrpc.in/student" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full py-4 rounded-xl bg-primary text-white text-center font-bold hover:bg-primary/90 transition shadow-lg shadow-primary/30"
                        >
                            Book an Appointment
                        </a>
                     </div>
                </div>
            </motion.div>

            {/* RIGHT COLUMN: MAP */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="lg:col-span-3 bg-white rounded-3xl overflow-hidden shadow-xl min-h-[400px] lg:min-h-full"
            >
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.558232987091!2d72.637207!3d23.239632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b2e663481f9%3A0x86bd92021c2105e1!2sLDRP%20Institute%20of%20Technology%20and%20Research!5e0!3m2!1sen!2sin!4v1709462832145!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, minHeight: "100%" }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="LDRP-ITR Location Map"
                ></iframe>
            </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
