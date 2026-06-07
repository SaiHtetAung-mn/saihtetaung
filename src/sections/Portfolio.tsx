import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUpRight, FiExternalLink, FiGithub, FiX } from 'react-icons/fi'
import ScrollFloatTitle from '@/components/ScrollFloatTitle'
import portfolioData from '@/data/portfolio.json'

type Category = 'work' | 'personal'

type Project = {
  title: string
  image: string
  description: string
  responsibility?: string
  tech_stack: string[]
  link?: string
  code_url?: string
  demo_url?: string
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('work')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const categories: Category[] = ['work', 'personal']
  const currentProjects = (portfolioData[activeCategory] ?? []) as Project[]

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!selectedProject) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [selectedProject])

  return (
    <section
      id="portfolio"
      className="min-h-screen bg-background px-4 py-20 text-primary sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <ScrollFloatTitle
            className="mb-4 text-4xl font-bold text-primary sm:text-5xl"
            segments={[
              { text: 'My' },
              { text: 'Portfolio', accent: true },
            ]}
          />
          <p className="text-xl text-secondary">Selected projects and product work</p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold capitalize transition-colors ${
                activeCategory === category
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border/70 bg-surface text-primary hover:border-accent/50 hover:bg-accent/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div key={activeCategory}>
          {currentProjects.length === 0 ? (
            <div className="rounded-lg border border-border/60 bg-surface px-6 py-12 text-center text-secondary">
              No projects in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {currentProjects.map((project, index) => (
                <motion.article
                  key={`${activeCategory}-${project.title}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.34, delay: Math.min(index * 0.05, 0.2), ease: 'easeOut' }}
                  whileHover={{ y: -2 }}
                  className="group relative overflow-hidden rounded-lg border border-border/60 bg-surface transition-shadow hover:shadow-[0_18px_54px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_64px_rgba(0,0,0,0.42)]"
                >
                  <div className="bg-surface p-1.5">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-background/40">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.14)_26%,rgba(0,0,0,0.68)_66%,rgba(0,0,0,0.92)_100%)]" />
                      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.75)' }}>
                        <h4 className="mb-1 line-clamp-2 text-sm font-semibold leading-tight text-white sm:text-lg">
                          {project.title}
                        </h4>
                        <p className="line-clamp-2 text-xs leading-relaxed text-white/90 sm:text-sm">{project.description}</p>

                        <button
                          onClick={() => setSelectedProject(project)}
                          className="mt-3 inline-flex items-center gap-1 rounded-full border border-white/45 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                        >
                          Detail
                          <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProject.title} project details`}
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full overflow-hidden rounded-t-2xl border border-border/70 bg-surface shadow-2xl sm:max-h-[85vh] sm:max-w-3xl sm:rounded-xl"
            >
              <div className="sm:hidden pt-2">
                <div className="mx-auto h-1.5 w-10 rounded-full bg-border/80" />
              </div>

              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-surface/95 px-4 py-3 sm:px-5">
                <h3 className="pr-3 text-base font-semibold text-primary sm:text-lg">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background text-primary transition-colors hover:border-accent/60 hover:text-accent"
                  aria-label="Close project details"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[calc(92vh-56px)] overflow-y-auto p-4 sm:max-h-[calc(85vh-60px)] sm:p-5">
                <div className="overflow-hidden rounded-lg border border-border/60 bg-background/40">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-auto max-h-[320px] w-full object-cover sm:max-h-[380px]"
                    loading="lazy"
                  />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-secondary sm:text-[15px]">{selectedProject.description}</p>

                {selectedProject.responsibility && (
                  <p className="mt-3 text-sm leading-relaxed text-secondary sm:text-[15px]">
                    <span className="font-semibold text-primary">Role:</span> {selectedProject.responsibility}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProject.tech_stack.map((tech) => (
                    <span
                      key={`${selectedProject.title}-${tech}`}
                      className="rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedProject.code_url && (
                    <a
                      href={selectedProject.code_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:border-accent/60 hover:bg-accent/10 hover:text-accent"
                    >
                      <FiGithub className="h-4 w-4" />
                      Code
                    </a>
                  )}
                  {(selectedProject.demo_url || selectedProject.link) && (
                    <a
                      href={selectedProject.demo_url ?? selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:border-accent/60 hover:bg-accent/10 hover:text-accent"
                    >
                      <FiExternalLink className="h-4 w-4" />
                      Visit
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
