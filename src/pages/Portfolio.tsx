import { motion } from 'framer-motion'
import { useState } from 'react'
import portfolioData from '../data/portfolio.json'

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<'work' | 'personal' | 'school'>('work')
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  
  const categories = ['work', 'personal', 'school'] as const

  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => new Set(prev).add(imagePath))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const currentProjects = portfolioData[activeCategory]

  return (
    <section
      id="portfolio"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Portfolio
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Showcasing my best work and projects
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex gap-4 justify-center mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize transition-all ${
                activeCategory === category
                  ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {currentProjects.length > 0 ? (
            currentProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Image with Skeleton Loading */}
                <div className="relative h-40 bg-slate-300 dark:bg-slate-700 overflow-hidden">
                  {!loadedImages.has(project.image) && (
                    <motion.div
                      animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      style={{ backgroundSize: '200% 100%' }}
                    />
                  )}
                  <img
                    src={project.image}
                    alt={project.title}
                    onLoad={() => handleImageLoad(project.image)}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      loadedImages.has(project.image) ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h4>
                    <p className="text-md text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Tech Stack - Highlighted with colorful chips */}
                  {/* <div className="flex gap-2 flex-wrap mb-6 flex-grow">
                    {project.tech_stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                      >
                        {tech}
                      </span>
                    ))}
                  </div> */}

                  {/* Links - Aligned to bottom */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                    {'code_url' in project && project.code_url && (
                      <a
                        href={project.code_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        Code
                      </a>
                    )}
                    {'demo_url' in project && project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        Demo
                      </a>
                    )}
                    {'link' in project && project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        Visit
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="col-span-full text-center py-12"
            >
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No projects in this category yet.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
