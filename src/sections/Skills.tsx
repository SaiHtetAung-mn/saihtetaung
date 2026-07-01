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
import Magnet from '@/components/Magnet';
import ScrollFloatTitle from '@/components/ScrollFloatTitle';
import { SiHaproxy } from "@/components/HaProxyIcon";

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
        { name: 'HAProxy', icon: SiHaproxy },
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
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.42 },
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
          viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
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
          viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
          className="space-y-10"
        >
          {skillCategories.map((categoryData, index) => {
            return (
              <motion.div key={index} variants={itemVariants} className="space-y-4">
                <ScrollFloatTitle
                  as="h3"
                  className="text-xl font-bold text-primary sm:text-2xl"
                  segments={[{ text: categoryData.category }]}
                />

                <div>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {categoryData.skills.map((skillData, skillIndex) => {
                      const IconComponent = skillData.icon
                      return (
                        <Magnet
                          key={skillData.name}
                          padding={36}
                          magnetStrength={7}
                          wrapperClassName="inline-block"
                        >
                          <motion.div
                            whileHover={{ y: -2, scale: 1.015 }}
                            whileTap={{ y: 0 }}
                            className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-1.5 transition-colors duration-200 hover:border-accent/55 hover:bg-accent/10"
                          >
                            <IconComponent className="text-sm text-accent transition-transform duration-200 group-hover:scale-110 sm:text-base" />
                            <span className="whitespace-nowrap text-sm font-medium text-primary transition-colors duration-200 group-hover:text-primary">
                              {skillData.name}
                            </span>
                          </motion.div>
                        </Magnet>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
