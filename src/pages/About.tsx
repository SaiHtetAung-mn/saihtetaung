import { motion } from 'framer-motion'
import { FiCheckCircle, FiCompass, FiTarget, FiZap } from 'react-icons/fi'
import { IoRocketSharp } from 'react-icons/io5'
import { MdTimer } from 'react-icons/md'
import { Counter } from '../components/Counter'

export function About() {
  const focusAreas = [
    'Front-of-frontend: design systems, accessible UI, and polished states.',
    'Product delivery: translating requirements into reliable features end-to-end.',
    'Performance and quality: profiling, testing, and keeping releases stable.',
  ];

  const currentFocus = [
    'Deepening TypeScript patterns and testing for safer refactors.',
    'Micro-interactions and motion that make products feel responsive.',
    'Automation across CI/CD to keep shipping velocity high.',
  ];

  const processSteps = [
    { title: 'Discover', detail: 'Clarify goals, constraints, and success metrics with stakeholders.' },
    { title: 'Design & plan', detail: 'Map flows, prototypes, and technical approaches before build.' },
    { title: 'Build & validate', detail: 'Ship iteratively with code review, testing, and instrumentation.' },
    { title: 'Launch & support', detail: 'Measure, refine, and keep the experience reliable post-release.' },
  ];

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
        <div className="grid lg:grid-cols-1 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                About Me
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I help teams ship reliable, high-polish web experiences with TypeScript, React, and thoughtful UX. I lean on design systems, performance-minded development, and clear communication to keep projects moving smoothly.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md border border-slate-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-gray-100 mb-3">
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
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-gray-100 mb-3">
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
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-7 shadow-lg border-l-4 border-slate-700 dark:border-slate-500">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <MdTimer className="w-8 h-8 text-slate-700 dark:text-slate-300" />
              </div>
              <div>
                <h3 className="text-4xl font-bold text-slate-800 dark:text-white">
                  <Counter end={4} duration={2} suffix="+" />
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Years of experience shipping web products</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-7 shadow-lg border-l-4 border-slate-700 dark:border-slate-500">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <IoRocketSharp className="w-8 h-8 text-slate-700 dark:text-slate-300" />
              </div>
              <div>
                <h3 className="text-4xl font-bold text-slate-800 dark:text-white">
                  <Counter end={10} duration={2} suffix="+" />
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Projects delivered from idea to launch</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-[1.2fr,0.8fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-7 shadow-lg border border-slate-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-gray-100 mb-4">
              <FiZap className="h-5 w-5 text-slate-600 dark:text-gray-300" />
              Highlights & principles
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p className="font-semibold text-slate-800 dark:text-gray-100">Recent focus</p>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <FiCheckCircle className="h-5 w-5 text-slate-600 dark:text-gray-200 mt-0.5 flex-shrink-0" />
                    <span>Designing component systems that scale across pages and teams.</span>
                  </li>
                  <li className="flex gap-2">
                    <FiCheckCircle className="h-5 w-5 text-slate-600 dark:text-gray-200 mt-0.5 flex-shrink-0" />
                    <span>Shipping dashboards and marketing sites with clear UX and state handling.</span>
                  </li>
                  <li className="flex gap-2">
                    <FiCheckCircle className="h-5 w-5 text-slate-600 dark:text-gray-200 mt-0.5 flex-shrink-0" />
                    <span>Keeping performance, accessibility, and DX as non-negotiables.</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p className="font-semibold text-slate-800 dark:text-gray-100">How I work</p>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <FiCheckCircle className="h-5 w-5 text-slate-600 dark:text-gray-200 mt-0.5 flex-shrink-0" />
                    <span>Collaborative and transparent—documented decisions and async-friendly.</span>
                  </li>
                  <li className="flex gap-2">
                    <FiCheckCircle className="h-5 w-5 text-slate-600 dark:text-gray-200 mt-0.5 flex-shrink-0" />
                    <span>Detail-minded UI polish with sensible animations and empty/error states.</span>
                  </li>
                  <li className="flex gap-2">
                    <FiCheckCircle className="h-5 w-5 text-slate-600 dark:text-gray-200 mt-0.5 flex-shrink-0" />
                    <span>Measure, iterate, and keep the feedback loop short.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-7 shadow-lg border border-slate-100 dark:border-gray-700 space-y-5"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-gray-100">
              <FiZap className="h-5 w-5 text-slate-600 dark:text-gray-300" />
              Process snapshot
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              {processSteps.map((step) => (
                <div key={step.title} className="p-4 rounded-lg bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-700">
                  <p className="font-semibold text-slate-800 dark:text-gray-100 mb-1">{step.title}</p>
                  <p className="text-sm leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
              <p className="font-semibold mb-1">Beyond the code</p>
              <p className="text-sm leading-relaxed">
                I enjoy learning in public, collaborating with designers, and mentoring newer developers so teams keep growing together.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
