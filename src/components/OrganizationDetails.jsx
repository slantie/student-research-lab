import { useParams, Navigate } from "react-router-dom";
import { organizationData } from "../data/organizationData";
import { motion } from "framer-motion";

const OrganizationDetails = () => {
  const { orgId } = useParams();
  const data = organizationData[orgId];

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative py-20 px-6 sm:px-10 lg:px-14 overflow-hidden bg-primary/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={data.image}
            alt={data.title}
            className="h-24 sm:h-32 object-contain mb-8 drop-shadow-lg"
          />
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4"
          >
            {data.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg sm:text-xl text-text-muted font-medium max-w-2xl italic"
          >
            "{data.subtitle}"
          </motion.p>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-primary rounded-full blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-accent rounded-full blur-[100px]" />
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-16 px-6 sm:px-10 lg:px-14">
        <div className="max-w-5xl mx-auto">

          {/* DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="prose prose-lg max-w-none text-text-primary mb-12"
          >
            {data.description.map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed text-text-muted text-lg">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* CAMPUS IMAGE */}
          {data.campusImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16 rounded-2xl overflow-hidden shadow-lg border border-border"
            >
              <img
                src={data.campusImage}
                alt={`${data.title} Campus`}
                className="w-full h-[300px] sm:h-[400px] object-cover"
              />
            </motion.div>
          )}

          {/* STATS */}
          {data.stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              {data.stats.map((stat, index) => (
                <div key={index} className="bg-primary/5 p-6 rounded-2xl text-center border border-primary/10">
                  <h4 className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.value}</h4>
                  <p className="text-text-muted font-medium text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* LEADERS / CHAIRMAN PROFILES */}
          {data.leaders && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10 text-center">Leadership</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {data.leaders.map((leader, index) => (
                  <div key={index} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-8 text-center">
                      <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 ring-4 ring-primary/10">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">{leader.name}</h3>
                      <p className="text-sm font-medium text-primary mt-1">{leader.title}</p>
                      {leader.quote && (
                        <p className="text-sm italic text-text-muted mt-3 max-w-sm mx-auto">
                          "{leader.quote}"
                        </p>
                      )}
                      <p className="text-text-muted text-sm mt-4 leading-relaxed">
                        {leader.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SVKM CHAIRMAN */}
          {data.chairman && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10 text-center">Hon. Chairman</h2>
              <div className="max-w-2xl mx-auto bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-8 text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 ring-4 ring-primary/10">
                    <img
                      src={data.chairman.image}
                      alt={data.chairman.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{data.chairman.name}</h3>
                  <p className="text-sm font-medium text-primary mt-1">{data.chairman.title}</p>
                  <p className="text-text-muted text-sm mt-4 leading-relaxed max-w-lg mx-auto">
                    {data.chairman.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* FOUNDERS (SVKM) */}
          {data.founders && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10 text-center">Founding Fathers</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {data.founders.map((founder, index) => (
                  <div key={index} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-8 text-center">
                      <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 ring-4 ring-primary/10 bg-neutral-100">
                        <img
                          src={founder.image}
                          alt={founder.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">{founder.name}</h3>
                      <p className="text-sm font-medium text-primary mt-1">{founder.title}</p>
                      <p className="text-text-muted text-sm mt-4 leading-relaxed">
                        {founder.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* MISSION & VISION */}
          {(data.mission || data.vision) && (
            <div className="grid md:grid-cols-2 gap-8 my-16">
              {data.mission && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card p-8 rounded-2xl border border-border shadow-sm"
                >
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Our Mission
                  </h3>
                  <p className="text-text-muted leading-relaxed">{data.mission}</p>
                </motion.div>
              )}
              {data.vision && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card p-8 rounded-2xl border border-border shadow-sm"
                >
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    Our Vision
                  </h3>
                  <p className="text-text-muted leading-relaxed">{data.vision}</p>
                </motion.div>
              )}
            </div>
          )}

          {/* GOALS */}
          {data.goals && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">Our Goals</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.goals.map((goal, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 bg-primary/5 rounded-xl border border-primary/10">
                    <div className="min-w-[28px] h-7 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-text-muted text-sm font-medium leading-relaxed">{goal}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* RESEARCH AREAS (MMPSRPC) */}
          {data.researchAreas && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">Research Areas</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {data.researchAreas.map((area, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/15 hover:bg-primary/15 transition-colors"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* COLLEGES LIST (KSV) */}
          {data.colleges && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">Constituent Colleges</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.colleges.map((college, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-text-muted text-sm font-medium">{college}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* UNIVERSITY CELLS (KSV) */}
          {data.universityCells && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">University Cells & Departments</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {data.universityCells.map((cell, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-card text-text-muted text-sm font-medium rounded-full border border-border"
                  >
                    {cell}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* FEATURES */}
          {data.features && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {data.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card p-5 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-semibold text-text-primary text-sm">{feature}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* CONTACT & LOCATION SECTION */}
          {data.contact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border-t border-border pt-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">
                Contact
              </h2>

              <div className="grid lg:grid-cols-2 gap-10">
                {/* CONTACT DETAILS */}
                <div className="flex flex-col gap-6">
                  <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                    <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                       <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                       Address
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {data.contact.address}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                       <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                         <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                         Email
                       </h3>
                       <a href={`mailto:${data.contact.email}`} className="text-primary hover:underline break-words">
                         {data.contact.email}
                       </a>
                    </div>
                    <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                       <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                         <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                         Phone
                       </h3>
                       <a href={`tel:${data.contact.phone.replace(/[^0-9+]/g, '')}`} className="text-primary hover:underline">
                         {data.contact.phone}
                       </a>
                    </div>
                  </div>
                </div>

                {/* MAP EMBED */}
                <div className="relative w-full h-[300px] lg:h-auto min-h-[300px] bg-neutral-100 rounded-xl overflow-hidden shadow-sm border border-border">
                  <iframe
                    title={`${data.title} Location`}
                    src={data.contact.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrganizationDetails;
