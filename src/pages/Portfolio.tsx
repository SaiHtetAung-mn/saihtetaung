import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react';
import portfolioData from '../data/portfolio.json';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export function Portfolio() {
  // Use correct keys from portfolioData
  const [activeCategory, setActiveCategory] = useState<'work' | 'personal'>('work');
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const categories = ['work', 'personal'] as const;
  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => new Set(prev).add(imagePath));
  };
  const currentProjects = portfolioData[activeCategory] ?? [];
  // Responsive cards per slide
  const [cardsPerSlide, setCardsPerSlide] = useState(1);
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = (newDirection: number) => {
    const totalSlides = Math.ceil(currentProjects.length / cardsPerSlide);
    if (totalSlides <= 1) return;
    let newPage = page + newDirection;
    if (newPage < 0) {
      newPage = totalSlides - 1;
    } else if (newPage >= totalSlides) {
      newPage = 0;
    }
    setPage([newPage, newDirection]);
  };

  // Responsive logic
  React.useEffect(() => {
    function updateCardsPerSlide() {
      if (window.innerWidth >= 1024) setCardsPerSlide(3);
      else if (window.innerWidth >= 640) setCardsPerSlide(2);
      else setCardsPerSlide(1);
    }
    updateCardsPerSlide();
    window.addEventListener('resize', updateCardsPerSlide);
    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, []);
  // Auto slideshow
  React.useEffect(() => {
    if (!currentProjects.length || isPaused) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 3500);
    return () => clearInterval(interval);
  }, [currentProjects.length, isPaused, cardsPerSlide, page]);
  // Reset page when category or cardsPerSlide changes
  React.useEffect(() => {
    setPage([0, 0]);
  }, [activeCategory, cardsPerSlide]);

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

        {/* Horizontal swipeable slideshow grid */}
        <div className="relative flex flex-col items-center select-none" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div className="relative w-full max-w-5xl h-[520px] overflow-hidden">
            {currentProjects.length > 0 ? (
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  className="absolute w-full h-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -10000) {
                      paginate(1);
                    } else if (swipe > 10000) {
                      paginate(-1);
                    }
                  }}
                >
                  {currentProjects.slice(page * cardsPerSlide, (page + 1) * cardsPerSlide).map((project, idx) => (
                    <div
                      key={project.title + idx}
                      className="h-full flex flex-col bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      {/* Image with Skeleton Loading */}
                      <div className="relative h-60 bg-slate-300 dark:bg-slate-700 overflow-hidden">
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
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No projects in this category yet.</p>
              </motion.div>
            )}
          </div>
          {/* Slide indicator dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(currentProjects.length / cardsPerSlide) }).map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 ${page === idx && 'w-6'} transition-all`}
                onClick={() => {
                  setIsPaused(true);
                  setPage([idx, idx > page ? 1 : -1]);
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
