import { motion } from 'framer-motion'
import { FiCheckCircle, FiCompass, FiTarget, FiZap } from 'react-icons/fi'
import { IoRocketSharp } from 'react-icons/io5'
import { MdTimer } from 'react-icons/md'
import { Counter } from '../components/Counter'
import ScrollFloatTitle from '../components/ScrollFloatTitle'

export function About() {
  const focusAreas = [
    'Architect and implement full-stack features from planning to deployment',
    'Optimize database queries and data models for performance and reliability',
    'Lead improvements in code quality, testing, and documentation standards',
    'Communicate technical reasoning confidently to both technical and non-technical stakeholders',
    'Continuously learning and adapting to new technologies to improve my workflow',
  ];

  const currentFocus = [
    'Diving deeper into more advanced backend concepts to improve how I design and ship production-ready features',
    'Contines learning through guided online programs',
    'Taking a system-level view of problems, improving architecture where it matters, and keeping the codebase clean and efficient as it evolves.'
  ];

  const techStack = ['Node.js', 'NestJS', 'ExpressJs', 'Laravel', 'React', 'MongoDB', 'MySQL', 'PostgreSQL', 'AWS'];

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-background px-4 py-20 text-primary sm:px-6 lg:px-8"
    >
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <ScrollFloatTitle
            className="mt-3 text-4xl font-bold text-primary sm:text-5xl"
            segments={[
              { text: 'About' },
              { text: 'Me', accent: true },
            ]}
          />
        </div>

        <div className="grid lg:grid-cols-1 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-2 mb-8 text-center">
              <p className="font-bold tracking-[0.18em] text-primary/60 sm:text-3xl md:text-2xl">Who I am</p>
              <p className="text-lg leading-relaxed text-secondary">
                I am a backend-focused full-stack engineer with a computer science background. For the past years, I've worked on payment integrations, ERP platforms, agri-fintech systems and digital campaign applications. I've contributed across the full software lifecycle: from architecture design and backend development to frontend implementation, deployment and production support.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:items-center gap-10 md:gap-14 pb-10 md:pb-12"
            >
              <div className="flex items-center gap-4 md:justify-end md:text-left">
                <div className="rounded-full bg-primary p-3 text-background">
                  <MdTimer className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-muted">Experience</p>
                  <h3 className="text-4xl font-bold text-primary">
                    <Counter end={4} duration={2} suffix="+" />
                  </h3>
                  <p className="font-medium text-secondary">years shipping web products</p>
                </div>
              </div>

              <div className="hidden md:flex justify-center">
                <div className="h-24 w-px bg-border/70" />
              </div>

              <div className="flex items-center gap-4 md:justify-start">
                <div className="rounded-full border border-border bg-surface p-3 text-primary">
                  <IoRocketSharp className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-muted">Launches</p>
                  <h3 className="text-4xl font-bold text-primary">
                    <Counter end={10} duration={2} suffix="+" />
                  </h3>
                  <p className="font-medium text-secondary">projects delivered from idea to launch</p>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 sm:mt-12">
              <div className="rounded-lg border border-border/60 bg-surface p-5">
                <div className="mb-3 flex items-center gap-2 font-bold text-primary">
                  <FiCompass className="h-5 w-5 text-current opacity-70" />
                  What I do
                </div>
                <ul className="space-y-3 text-secondary">
                  {focusAreas.map((item) => (
                    <li key={item} className="flex gap-2">
                      <FiCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-current" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-border/60 bg-surface p-5">
                <div className="mb-3 flex items-center gap-2 font-bold text-primary">
                  <FiTarget className="h-5 w-5 text-current opacity-70" />
                  Currently focused on
                </div>
                <ul className="space-y-3 text-secondary">
                  {currentFocus.map((item) => (
                    <li key={item} className="flex gap-2">
                      <FiCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-current" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-border/60 bg-surface p-5">
                <div className="mb-3 flex items-center gap-2 font-bold text-primary">
                  <FiZap className="h-5 w-5 text-current opacity-70" />
                  Most used tech stack
                </div>
                <div className="flex flex-wrap gap-3">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border/70 bg-surface px-4 py-2 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
