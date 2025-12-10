import { useState, useRef } from 'react';
import portfolioData from '../data/portfolio.json';


export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<'work' | 'personal'>('work');
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const categories = ['work', 'personal'] as const;
  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => new Set(prev).add(imagePath));
  };
  const currentProjects = portfolioData[activeCategory] ?? [];

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="portfolio"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Portfolio
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Showcasing my best work and projects
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize transition-all ${
                activeCategory === category
                  ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full flex items-center">
          {/* Navigation arrows for medium+ screens, outside scroll area */}
          <button
            type="button"
            className="hidden md:flex items-center justify-center rounded-full z-20 w-12 h-12  bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition mx-2"
            style={{ position: 'relative' }}
            onClick={() => scrollByAmount(-320)}
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 text-gray-700 dark:text-gray-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div
            ref={scrollRef}
            className={`w-full overflow-x-auto pb-4 portfolio-scrollbar-hide relative ${currentProjects.length === 1 ? '' : 'pr-8 sm:pr-0'}`}
          >
            <div
              className={`flex ${currentProjects.length === 1 ? 'justify-center' : ''} ${currentProjects.length === 1 ? '' : 'gap-4 sm:gap-8 pl-2'} snap-x snap-mandatory touch-pan-x`}
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {currentProjects.length > 0 ? (
                currentProjects.map((project, idx) => {
                  const cardWidth = currentProjects.length === 1 ? 'w-full' : 'w-72 sm:w-80';
                  const categoryLabel = activeCategory === 'work' ? 'Client Work' : 'Personal Build';
                  return (
                    <div
                      key={project.title + idx}
                      className={`flex-shrink-0 ${cardWidth} animate-portfolio-fade snap-center`}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="group relative h-full rounded-2xl bg-gradient-to-b from-slate-900/10 via-slate-900/5 to-white dark:from-slate-100/15 dark:via-slate-100/5 dark:to-slate-900/50 p-[1px] shadow-lg shadow-slate-900/5 dark:shadow-black/40 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                        <div className="flex flex-col h-full bg-white/90 dark:bg-gray-800/90 rounded-2xl overflow-hidden backdrop-blur">
                          <div className="relative h-56 bg-slate-200 dark:bg-slate-700">
                            {!loadedImages.has(project.image) && (
                              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
                            )}
                            <img
                              src={project.image}
                              alt={project.title}
                              onLoad={() => handleImageLoad(project.image)}
                              className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages.has(project.image) ? 'opacity-100' : 'opacity-0'}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full backdrop-blur bg-white/85 text-slate-800 dark:bg-gray-900/75 dark:text-gray-100 border border-white/60 dark:border-gray-700">
                              {categoryLabel}
                            </span>
                          </div>

                          <div className="p-6 flex flex-col h-full gap-4">
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="font-semibold text-md text-gray-900 dark:text-white leading-tight">
                                {project.title}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                              {project.description}
                            </p>

                            <div className="flex gap-2 flex-wrap">
                              {project.tech_stack.map((tech, idx) => (
                                <span
                                  key={idx as number}
                                  className="px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-800 dark:text-gray-100 bg-slate-100/80 dark:bg-gray-700/80 border border-slate-200 dark:border-gray-600 rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            <div className="flex gap-3 mt-auto pt-2">
                              {'code_url' in project && project.code_url && (
                                <a
                                  href={project.code_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 hover:-translate-y-0.5 hover:shadow-sm transition-transform"
                                >
                                  Code
                                  <span aria-hidden>↗</span>
                                </a>
                              )}
                              {'demo_url' in project && project.demo_url && (
                                <a
                                  href={project.demo_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-100 dark:border-emerald-800 hover:-translate-y-0.5 hover:shadow-sm transition-transform"
                                >
                                  Demo
                                  <span aria-hidden>↗</span>
                                </a>
                              )}
                              {'link' in project && project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:-translate-y-0.5 hover:shadow-sm transition-transform"
                                >
                                  Visit
                                  <span aria-hidden>↗</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-full text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">No projects in this category yet.</p>
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            className="hidden md:flex items-center rounded-full justify-center z-20 w-12 h-12 bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition mx-2"
            style={{ position: 'relative' }}
            onClick={() => scrollByAmount(320)}
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 text-gray-700 dark:text-gray-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
