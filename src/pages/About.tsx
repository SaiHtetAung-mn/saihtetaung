import { motion } from 'framer-motion'
import { FiCheckCircle, FiCompass, FiTarget, FiZap } from 'react-icons/fi'
import { IoRocketSharp } from 'react-icons/io5'
import { MdTimer } from 'react-icons/md'
import { Counter } from '../components/Counter'

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

  const techStack = ['Node.js', 'NestJS', 'React', 'MongoDB', 'MySQL', 'AWS'];

  return (
    <section
      id="about"
      className="relative overflow-hidden min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="absolute inset-0 opacity-50 blur-3xl pointer-events-none">
        <div className="absolute -top-40 -left-20 h-80 w-80 bg-slate-300 dark:bg-slate-700 rounded-full mix-blend-multiply" />
        <div className="absolute -bottom-32 -right-10 h-80 w-80 bg-slate-200 dark:bg-slate-800 rounded-full mix-blend-multiply" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mt-3">About Me</h2>
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
              <p className="sm:text-3xl md:text-2xl font-bold tracking-[0.18em] text-slate-500 dark:text-slate-400">Who I am</p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I’m a backend-focused full-stack engineer with a computer science background. I spend most of my time building reliable services and clean APIs along with the UI needed to run and debug them. I care a lot about data models, observability, and clear boundaries between systems, and I prefer code and architecture that stay understandable long after they’re written.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:items-center gap-8 md:gap-14 md:pb-12"
            >
              <div className="flex items-center gap-4 md:justify-end md:text-left">
                <div className="p-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm">
                  <MdTimer className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Experience</p>
                  <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                    <Counter end={4} duration={2} suffix="+" />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">years shipping web products</p>
                </div>
              </div>

              <div className="hidden md:flex justify-center">
                <div className="w-px h-24 bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-gray-600" />
              </div>

              <div className="flex items-center gap-4 md:justify-start">
                <div className="p-3 rounded-full bg-amber-500 text-slate-900 shadow-sm">
                  <IoRocketSharp className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Launches</p>
                  <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                    <Counter end={10} duration={2} suffix="+" />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">projects delivered from idea to launch</p>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md border border-slate-100 dark:border-gray-700">
                <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-gray-100 mb-3">
                  <FiCompass className="h-5 w-5 text-slate-600 dark:text-gray-300" />
                  What I do
                </div>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {focusAreas.map((item) => (
                    <li key={item} className="flex gap-2">
                      <FiCheckCircle className="h-5 w-5 text-slate-600 dark:text-gray-200 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md border border-slate-100 dark:border-gray-700">
                <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-gray-100 mb-3">
                  <FiTarget className="h-5 w-5 text-slate-600 dark:text-gray-300" />
                  Currently focused on
                </div>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {currentFocus.map((item) => (
                    <li key={item} className="flex gap-2">
                      <FiCheckCircle className="h-5 w-5 text-slate-600 dark:text-gray-200 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md border border-slate-100 dark:border-gray-700">
                <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-gray-100 mb-3">
                  <FiZap className="h-5 w-5 text-slate-600 dark:text-gray-300" />
                  Most used tech stack
                </div>
                <div className="flex flex-wrap gap-3">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full bg-slate-50 text-slate-800 border border-slate-200 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
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
