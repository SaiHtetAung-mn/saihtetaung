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
import ScrollFloatTitle from '../components/ScrollFloatTitle';

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
      className="min-h-screen bg-background px-4 py-20 text-primary sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <ScrollFloatTitle
            className="mb-4 text-4xl font-bold text-primary sm:text-5xl"
            segments={[
              { text: 'My' },
              { text: 'Skills', accent: true },
            ]}
          />
          <p className="text-xl text-secondary">
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
              className="rounded-lg border border-border/60 bg-surface p-8 transition-colors"
            >
              {/* Header */}
              <ScrollFloatTitle
                as="h3"
                className="mb-6 text-2xl font-bold text-primary"
                segments={[{ text: categoryData.category }]}
              />

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
                      <div className="rounded-lg border border-border/70 bg-surface p-3 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                        <IconComponent className="text-2xl" />
                      </div>
                      
                      {/* Skill name */}
                      <span className="whitespace-nowrap text-center text-xs font-bold text-primary">
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
