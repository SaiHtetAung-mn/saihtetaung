import { motion } from 'framer-motion'
import {
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiLaravel,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiMui,
  SiJquery,
  SiRedux,
  SiHtml5,
  SiReact,
  SiVite,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiLinux,
  SiJira,
  SiGit,
  SiAmazon,
  SiRedis,
  SiNginx,
  SiSocketdotio,
  SiPostman
} from 'react-icons/si'
import { GrDeploy } from "react-icons/gr";

export function Skills() {
  const skillCategories = [
    {
      category: 'Backend',
      skills: [
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'NestJs', icon: SiNestjs },
        { name: 'Express.js', icon: SiExpress },
        { name: 'Socket.io', icon: SiSocketdotio },
        { name: 'Laravel', icon: SiLaravel, },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'MySql', icon: SiMysql },
        { name: 'Redis', icon: SiRedis },
      ],
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'React', icon: SiReact },
        { name: 'Redux', icon: SiRedux },
        { name: 'Vite', icon: SiVite },
        { name: 'MUI', icon: SiMui },
        { name: 'JQuery', icon: SiJquery },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'HTML/CSS', icon: SiHtml5 },
      ],
    },
    {
      category: 'DevOps & Tools',
      skills: [
        { name: 'Linux', icon: SiLinux },
        { name: 'AWS', icon: SiAmazon },
        { name: 'Nginx', icon: SiNginx },
        { name: 'Docker', icon: SiDocker },
        { name: 'Git', icon: SiGit },
        { name: 'CI/CD', icon: GrDeploy },
        { name: 'Jira', icon: SiJira },
        { name: 'Postman', icon: SiPostman },
      ],
    }
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
      className="min-h-screen bg-white px-4 py-20 text-black sm:px-6 lg:px-8 dark:bg-black dark:text-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="mb-4 text-4xl font-bold text-black sm:text-5xl dark:text-white">
            My Skills
          </h2>
          <p className="text-xl text-black/65 dark:text-white/65">
            Technologies and tools I work with
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((categoryData, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="rounded-lg border border-black/10 bg-white p-8 transition-colors dark:border-white/15 dark:bg-black"
            >
              {/* Header */}
              <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                {categoryData.category}
              </h3>

              {/* Skills grid */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {categoryData.skills.map((skillData, skillIndex) => {
                  const IconComponent = skillData.icon
                  return (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ y: -3 }}
                      whileTap={{ y: 0 }}
                      className="group relative flex flex-col items-center gap-2"
                    >
                      {/* Icon */}
                      <div className="rounded-lg border border-black/15 bg-white p-3 text-black transition-colors group-hover:bg-black group-hover:text-white dark:border-white/20 dark:bg-black dark:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                        <IconComponent className="text-2xl" />
                      </div>
                      
                      {/* Skill name */}
                      <span className="whitespace-nowrap text-center text-xs font-bold text-black dark:text-white">
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
