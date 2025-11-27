import { motion } from 'framer-motion'
import certificationsData from '../data/certifications.json'
import { FaGraduationCap } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";

export function Education() {
  const educationItems = [
    {
      id: 1,
      school: 'University Of Information Technology, Yangon',
      degree: 'Bachelor of Computer Science in Software Engineering',
      year: '2020 - 2024',
    }
  ]

  const certificationItems = certificationsData.map((cert, index) => ({
    id: index + 1,
    title: cert.title,
    issuer: cert.issuer,
    year: cert.year,
    icon: '🏆',
  }))

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
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
            {educationItems.map((edu) => (
              <motion.div
                key={edu.id}
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
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                    {edu.school}
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
            {certificationItems.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-slate-700 dark:border-slate-500"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{cert.icon}</div>
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
