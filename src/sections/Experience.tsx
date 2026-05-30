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
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  }

  return (
    <section
      id="experience"
      className="min-h-screen bg-white px-4 py-20 text-black sm:px-6 lg:px-8 dark:bg-black dark:text-white"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold text-black sm:text-5xl dark:text-white">
            Work Experience
          </h2>
          <p className="text-xl text-black/65 dark:text-white/65">
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
          <div className="absolute bottom-0 left-8 top-0 hidden w-px bg-black/20 dark:bg-white/20 sm:block" />

          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative sm:pl-24 sm:ml-4 pl-0"
            >
              {/* Timeline dot */}
              <motion.div
                whileHover={{ y: -2 }}
                className="absolute left-2 top-2 hidden h-12 w-12 items-center justify-center rounded-full border border-black bg-white text-lg font-bold text-black dark:border-white dark:bg-black dark:text-white sm:flex"
              >
                {exp.id}
              </motion.div>

              {/* Content card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-lg border border-black/10 bg-white p-8 transition-colors dark:border-white/15 dark:bg-black"
              >
                {/* Header with period and type */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-black sm:text-2xl dark:text-white">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-md font-semibold text-black/75 dark:text-white/75">
                        {exp.company}
                      </p>
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full p-1.5 text-black/60 transition-colors hover:bg-black hover:text-white dark:text-white/60 dark:hover:bg-white dark:hover:text-black"
                          title={`Visit ${exp.company}`}
                        >
                          <MdOpenInNew className="text-sm" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Right side info */}
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <p className="text-sm font-bold tracking-wider text-black/60 dark:text-white/60">
                      {exp.period}
                    </p>
                    <motion.span
                      whileHover={{ y: -1 }}
                      className="flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-bold tracking-wide text-black dark:border-white/20 dark:bg-black dark:text-white"
                    >
                      {exp.type === 'Onsite' && <BiSolidBuildingHouse className="text-lg" />}
                      {exp.type === 'Remote' && <MdLocationOn className="text-lg" />}
                      {exp.type}
                    </motion.span>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 h-px bg-black/10 dark:bg-white/15" />

                {/* Description */}
                <ul className="mb-5 list-outside list-disc space-y-3 pl-5 text-base leading-relaxed text-black/70 dark:text-white/70">
                  {exp.description.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ y: -1 }}
                      className="rounded-full border border-black/15 bg-white px-3 py-1.5 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white dark:border-white/20 dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
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
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-black/65 dark:text-white/65">
            Continuously learning and growing with each project and challenge
          </p>
        </motion.div>
      </div>
    </section>
  )
}
