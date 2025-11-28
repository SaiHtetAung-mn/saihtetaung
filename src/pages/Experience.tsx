import { motion } from 'framer-motion'
import { MdLocationOn } from 'react-icons/md'
import { BiSolidBuildingHouse } from 'react-icons/bi'
import { MdOpenInNew } from 'react-icons/md'
import experienceData from '../data/experience.json'

export function Experience() {
  const experiences = experienceData.map((exp, index) => ({
    id: index + 1,
    title: exp.position,
    company: exp.company,
    period: `${exp.from_date} - ${exp.to_date}`,
    type: exp.location,
    description: exp.description,
    highlights: [],
    link: exp.link,
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="experience"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            My professional journey and career milestones
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12 relative"
        >
          {/* Vertical line - Left side (hidden on mobile) */}
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-500 dark:from-slate-500 dark:via-slate-600 dark:to-slate-700" />

          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative sm:pl-24 sm:ml-4 pl-0"
            >
              {/* Timeline dot */}
              <motion.div
                whileHover={{ scale: 1.3 }}
                className="hidden sm:flex absolute left-2 top-2 w-12 h-12 bg-gradient-to-r from-slate-700 to-slate-600 dark:from-slate-500 dark:to-slate-600 rounded-full border-4 border-white dark:border-gray-900 items-center justify-center text-white font-bold text-lg shadow-lg"
              >
                {exp.id}
              </motion.div>

              {/* Content card */}
              <motion.div
                whileHover={{ scale: 1.02, translateY: -5 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Header with period and type */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-lg text-slate-700 dark:text-slate-300 font-semibold">
                        {exp.company}
                      </p>
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all"
                          title={`Visit ${exp.company}`}
                        >
                          <MdOpenInNew className="text-sm" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Right side info */}
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider">
                      {exp.period}
                    </p>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide flex items-center gap-2 ${
                        exp.type === 'Onsite'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : exp.type === 'Remote'
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                      }`}
                    >
                      {exp.type === 'Onsite' && <BiSolidBuildingHouse className="text-lg" />}
                      {exp.type === 'Remote' && <MdLocationOn className="text-lg" />}
                      {exp.type}
                    </motion.span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-600 my-4" />

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5 text-base">
                  {exp.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Continuously learning and growing with each project and challenge
          </p>
        </motion.div>
      </div>
    </section>
  )
}
