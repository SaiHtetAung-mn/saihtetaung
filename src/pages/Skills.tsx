import { motion } from 'framer-motion'
import {
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiGit,
  SiAmazon,
  SiGithub,
} from 'react-icons/si'

export function Skills() {
  const skillCategories = [
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'Express', icon: SiExpress },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'Python', icon: SiPython },
        { name: 'REST APIs', icon: SiGithub },
      ],
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'React', icon: SiReact },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'Next.js', icon: SiReact },
        { name: 'HTML/CSS', icon: SiGithub },
      ],
    },
    {
      category: 'DevOps & Tools',
      skills: [
        { name: 'Docker', icon: SiDocker },
        { name: 'Git', icon: SiGit },
        { name: 'AWS', icon: SiAmazon },
        { name: 'CI/CD', icon: SiDocker },
        { name: 'GitHub', icon: SiGithub },
      ],
    },
    {
      category: 'Soft Skills',
      skills: [
        { name: 'Team Leadership', icon: SiGithub },
        { name: 'Problem Solving', icon: SiGithub },
        { name: 'Communication', icon: SiGithub },
        { name: 'Project Management', icon: SiGithub },
        { name: 'Mentoring', icon: SiGithub },
      ],
    },
  ]

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

  return (
    <section
      id="skills"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Technologies and tools I work with
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((categoryData, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all border-t-4 border-slate-700 dark:border-slate-500"
            >
              {/* Header */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {categoryData.category}
              </h3>

              {/* Skills grid */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {categoryData.skills.map((skillData, skillIndex) => {
                  const IconComponent = skillData.icon
                  return (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ scale: 1.12, y: -6 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative flex flex-col items-center gap-2"
                    >
                      {/* Glow background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10" />
                      
                      {/* Icon */}
                      <div className="p-3 bg-gradient-to-r from-slate-700 to-slate-600 dark:from-slate-600 dark:to-slate-700 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                        <IconComponent className="text-2xl text-white" />
                      </div>
                      
                      {/* Skill name */}
                      <span className="text-xs font-bold text-gray-900 dark:text-white text-center whitespace-nowrap">
                        {skillData.name}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
