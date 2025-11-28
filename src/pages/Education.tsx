import { motion } from 'framer-motion'
import certificationsData from '../data/certifications'
import { FaGraduationCap } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { MdOpenInNew } from 'react-icons/md';

export function Education() {
  const educationItems = [
    {
      school: 'University Of Information Technology, Yangon',
      degree: 'Bachelor of Computer Science in Software Engineering',
      year: '2020 - 2024',
      link: "https://www.uit.edu.mm/"
    }
  ]

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
                <div className="relative">
                  <div className="absolute -left-3.5 sm:-left-6 top-0 w-6 h-6 bg-slate-700 dark:bg-slate-500 rounded-full border-4 border-white dark:border-gray-800" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-wide">
                    {edu.year}
                  </p>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {edu.degree}
                  </h4>
                  <p className="flex gap-2 items-center text-lg text-gray-600 dark:text-gray-300 mt-1">
                    {edu.school}
                    {edu.link && (
                      <a
                        href={edu.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all"
                        title={`Visit ${edu.school}`}
                      >
                        <MdOpenInNew className="text-sm" />
                      </a>
                    )}
                  </p>
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
            {certificationsData.map((cert, index) => (
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
      </div>
    </section>
  )
}
