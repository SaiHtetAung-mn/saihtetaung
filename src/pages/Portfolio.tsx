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
                  return (
                    <div
                      key={project.title + idx}
                      className={`flex-shrink-0 ${cardWidth} flex flex-col bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow animate-portfolio-fade snap-center`}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="relative h-60 bg-slate-300 dark:bg-slate-700 overflow-hidden">
                        {!loadedImages.has(project.image) && (
                          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
                        )}
                        <img
                          src={project.image}
                          alt={project.title}
                          onLoad={() => handleImageLoad(project.image)}
                          className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages.has(project.image) ? 'opacity-100' : 'opacity-0'}`}
                        />
                      </div>
                      <div className="p-6 flex flex-col h-full">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h4>
                          <p className="text-md text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                        </div>
                        <div className="flex gap-2 flex-wrap mb-4">
                          {project.tech_stack.map((tech, idx) => (
                            <span key={idx as number} className="px-3 py-1 text-xs text-gray-600 bg-gray-200 dark:text-gray-600 dark:bg-gray-300 rounded rounded-full">{tech}</span>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-auto">
                          {'code_url' in project && project.code_url && (
                            <a href={project.code_url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Code</a>
                          )}
                          {'demo_url' in project && project.demo_url && (
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Demo</a>
                          )}
                          {'link' in project && project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Visit</a>
                          )}
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
