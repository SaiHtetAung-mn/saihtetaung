import React from 'react';
import { motion } from 'framer-motion'
import certificationsData from '../data/education'
import { FaGraduationCap } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { MdOpenInNew } from 'react-icons/md';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

export function Education() {
  const educationItems = certificationsData.educations;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const certifications = certificationsData.certifications;
  const achievements = certificationsData.achievements;
  return (
    <section
      id="education"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Education & Certifications
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            My academic background and professional certifications
          </p>
        </motion.div>

        {/* Education Section */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <div className="text-4xl mr-2 flex-shrink-0">
              <FaGraduationCap />
            </div>
            Education
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {educationItems.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border-l-4 border-slate-700 dark:border-slate-500 sm:pl-8 pl-4 py-4"
              >
                <div className="relative flex flex-col sm:flex-row items-stretch gap-6 min-h-[140px]">
                  <div className="w-full sm:w-32 md:w-40 h-full rounded-lg overflow-hidden flex items-stretch">
                    <ImageWithSkeleton
                      src={edu.school_image ? `/${edu.school_image}` : ''}
                      alt={edu.school}
                      className="w-full h-full object-cover"
                      style={{ minHeight: '140px', maxHeight: '100%', background: '' }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-wide">
                      {edu.year}
                    </p>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                      {edu.degree}
                    </h4>
                    <p className="flex gap-2 items-center text-lg text-gray-600 dark:text-gray-300 mt-1">
                      {edu.school}
                      {edu.school_link && (
                        <a
                          href={edu.school_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all"
                          title={`Visit ${edu.school}`}
                        >
                          <MdOpenInNew className="text-sm" />
                        </a>
                      )}
                    </p>
                    {edu.verify_link && (
                      <a
                        href={edu.verify_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit inline-block mt-2 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        Verify Degree →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <div className="text-4xl mr-2 flex-shrink-0">
              <GiAchievement />
            </div>
            Certifications
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-slate-700 dark:border-slate-500"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-bold dark:text-white text-slate-700 dark:text-slate-300">{<cert.icon />}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-wide">
                      {cert.year}
                    </p>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                      {cert.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {cert.issuer}
                    </p>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 px-3 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        View Certificate →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Achievements Section */}
        {achievements && achievements.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
              <div className="text-4xl mr-2 flex-shrink-0">
                <GiAchievement />
              </div>
              Achievements
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {achievements.map((ach, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.04 }}
                  className="rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-slate-700 dark:border-slate-500 relative overflow-hidden min-h-[220px] flex items-end"
                >
                  {/* Multiple images: crossfade animation */}
                  {Array.isArray(ach.image) ? (
                    <CrossfadeImages images={ach.image} />
                  ) : (
                    <motion.div
                      className="absolute inset-0 w-full h-full"
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1 }}
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(30,30,30,0.3), rgba(0,0,0,0.7)), url(/${ach.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(10%)',
                        zIndex: 0,
                      }}
                    />
                  )}
                  <div className="bg-gradient-to-t from-black/70 via-black/40 to-transparent w-full p-6 rounded-b-lg relative z-10">
                    <p className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
                      {ach.year}
                    </p>
                    <h4 className="text-lg font-bold text-white mt-1">
                      {ach.title}
                    </h4>
                    <p className="text-gray-200 mt-1">
                      {ach.issuer}
                    </p>
                  </div>
                </motion.div>

// Remove duplicate CrossfadeImages implementation

              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

export function CrossfadeImages({ images }: { images: string[] }) {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="absolute inset-0 w-full h-full">
      {images.map((img, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 w-full h-full"
          initial={false}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(30,30,30,0.3), rgba(0,0,0,0.7)), url(/${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(10%)',
            zIndex: 0,
          }}
        />
      ))}
    </div>
  );
}
