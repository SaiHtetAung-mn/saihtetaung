import { motion } from 'framer-motion'
import meImage from '../assets/me.jpeg'
import { Counter } from '../components/Counter'
import { MdTimer } from 'react-icons/md'
import { IoRocketSharp } from 'react-icons/io5'

export function About() {
  return (
    <section
      id="about"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-xl ring-4 ring-slate-800 dark:ring-slate-600">
              <img
                src={meImage}
                alt="About"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Welcome to my portfolio! I'm a passionate developer dedicated to creating beautiful and functional digital experiences.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              With expertise in modern web technologies, I focus on building responsive, performant applications that make a real impact.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the community.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Experience Box */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-slate-700 dark:border-slate-500"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <MdTimer className="w-8 h-8 text-slate-700 dark:text-slate-300" />
              </div>
              <div>
                <h3 className="text-4xl font-bold text-slate-800 dark:text-white">
                  <Counter end={4} duration={2} suffix="+" />
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Years of Experience</p>
              </div>
            </div>
          </motion.div>

          {/* Projects Box */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-slate-700 dark:border-slate-500"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <IoRocketSharp className="w-8 h-8 text-slate-700 dark:text-slate-300" />
              </div>
              <div>
                <h3 className="text-4xl font-bold text-slate-800 dark:text-white">
                  <Counter end={10} duration={2} suffix="+" />
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Projects Successfully Delivered</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
