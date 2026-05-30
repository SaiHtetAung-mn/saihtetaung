import { motion } from 'framer-motion'
import { MdLocationOn } from 'react-icons/md'
import { BiSolidBuildingHouse } from 'react-icons/bi'
import { MdOpenInNew } from 'react-icons/md'
import experienceData from '@/data/experience.json'
import ScrollFloatTitle from '@/components/ScrollFloatTitle'

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
      className="min-h-screen bg-background px-4 py-20 text-primary sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <ScrollFloatTitle
            className="mb-4 text-4xl font-bold text-primary sm:text-5xl"
            segments={[
              { text: 'Work' },
              { text: 'Experience', accent: true },
            ]}
          />
          <p className="text-xl text-secondary">
            My professional journey and career milestones
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
          className="space-y-12 relative"
        >
          {/* Vertical line - Left side (hidden on mobile) */}
          <div className="absolute bottom-0 left-8 top-0 hidden w-px bg-border/70 sm:block" />

          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative sm:pl-24 sm:ml-4 pl-0"
            >
              {/* Timeline dot */}
              <motion.div
                whileHover={{ y: -2 }}
                className="absolute left-2 top-2 hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-lg font-bold text-primary sm:flex"
              >
                {exp.id}
              </motion.div>

              {/* Content card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-lg border border-border/60 bg-surface p-8 transition-colors"
              >
                {/* Header with period and type */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-primary sm:text-2xl">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-md font-semibold text-secondary">
                        {exp.company}
                      </p>
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full p-1.5 text-secondary transition-colors hover:bg-accent hover:text-accent-foreground"
                          title={`Visit ${exp.company}`}
                        >
                          <MdOpenInNew className="text-sm" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Right side info */}
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <p className="text-sm font-bold tracking-wider text-secondary">
                      {exp.period}
                    </p>
                    <motion.span
                      whileHover={{ y: -1 }}
                      className="flex items-center gap-2 rounded-full text-sm font-bold tracking-wide text-accent text-opacity-70 transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {exp.type === 'Onsite' && <BiSolidBuildingHouse className="text-lg" />}
                      {exp.type === 'Remote' && <MdLocationOn className="text-lg" />}
                      {exp.type}
                    </motion.span>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 h-px bg-border/70" />

                {/* Description */}
                <ul className="mb-5 list-outside list-disc space-y-3 pl-5 text-base leading-relaxed text-secondary">
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
                      className="rounded-full border border-border/70 bg-surface px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
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
          viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-secondary">
            Continuously learning and growing with each project and challenge
          </p>
        </motion.div>
      </div>
    </section>
  )
}
