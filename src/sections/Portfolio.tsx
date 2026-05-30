import { useEffect, useState, useRef } from 'react';
import portfolioData from '../data/portfolio.json';


export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<'work' | 'personal'>('work');
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const categories = ['work', 'personal'] as const;
  const handleImageLoad = (imagePath: string) => {
    setLoadedImages(prev => new Set(prev).add(imagePath));
  };
  const currentProjects = Array.isArray(portfolioData[activeCategory])
    ? portfolioData[activeCategory]
    : [];

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const scrollToCard = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLDivElement>('[data-portfolio-card]');
    const card = cards[index];
    if (!card) return;
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offset = cardRect.left - containerRect.left;
    const target = container.scrollLeft + offset - (container.clientWidth - cardRect.width) / 2;
    container.scrollTo({ left: target, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLDivElement>('[data-portfolio-card]');
    setDotCount(cards.length);
    setActiveProjectIndex((prev) => {
      if (!cards.length) return 0;
      return Math.min(prev, cards.length - 1);
    });

    const handleScroll = () => {
      const cards = Array.from(container.querySelectorAll<HTMLDivElement>('[data-portfolio-card]'));
      if (!cards.length) return;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + container.clientWidth / 2;
      let closestIdx = 0;
      let minDistance = Number.MAX_VALUE;
      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });
      setActiveProjectIndex(closestIdx);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeCategory, currentProjects.length]);

  useEffect(() => {
    setActiveProjectIndex(0);
    scrollToCard(0);
  }, [activeCategory]);

  return (
    <section
      id="portfolio"
      className="min-h-screen bg-background px-4 py-20 text-primary sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl font-bold text-primary sm:text-5xl">
            My <span className="text-accent">Portfolio</span>
          </h2>
          <p className="text-xl text-secondary">
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
                  ? 'bg-accent text-accent-foreground'
                  : 'border border-border/70 bg-surface text-primary hover:bg-accent hover:text-accent-foreground'
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
            className="z-20 mx-2 hidden h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-surface text-primary transition-colors hover:bg-accent hover:text-accent-foreground md:flex"
            style={{ position: 'relative' }}
            onClick={() => scrollByAmount(-320)}
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-7 w-7">
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
                      data-portfolio-card
                      className={`flex-shrink-0 ${cardWidth} animate-portfolio-fade snap-center`}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="group relative h-full rounded-lg border border-border/60 bg-surface transition-transform duration-300 hover:-translate-y-1">
                        <div className="flex h-full flex-col overflow-hidden rounded-lg bg-surface">
                          <div className="relative h-48 sm:h-52">
                            {!loadedImages.has(project.image) && (
                              <div className="absolute inset-0 animate-pulse bg-border/35" />
                            )}
                            <img
                              src={project.image}
                              alt={project.title}
                              onLoad={() => handleImageLoad(project.image)}
                              className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages.has(project.image) ? 'opacity-100' : 'opacity-0'}`}
                            />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          </div>

                          <div className="p-5 flex flex-col h-full gap-3">
                            <h4 className="text-md font-semibold leading-tight text-primary">
                              {project.title}
                            </h4>
                            <p
                              className="text-sm leading-relaxed text-secondary"
                            >
                              {project.description}
                            </p>
                            {'responsibility' in project && project.responsibility && (
                              <p
                                className="text-xs leading-relaxed text-secondary/80"
                              >
                                <span className="font-semibold text-primary">Role:</span>{' '}
                                {project.responsibility}
                              </p>
                            )}

                            <div className="flex gap-2 flex-wrap">
                              {project.tech_stack.map((tech, idx) => (
                                <span
                                  key={idx as number}
                                  className="rounded-full border border-border/70 bg-surface px-3 py-1 text-[11px] font-semibold tracking-wide text-primary"
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
                                  className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-surface px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
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
                                  className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-surface px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
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
                                  className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-surface px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
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
                  <p className="text-lg text-secondary">No projects in this category yet.</p>
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            className="z-20 mx-2 hidden h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-surface text-primary transition-colors hover:bg-accent hover:text-accent-foreground md:flex"
            style={{ position: 'relative' }}
            onClick={() => scrollByAmount(320)}
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-7 w-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
        {dotCount > 0 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: dotCount }).map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                aria-label={`Go to project ${idx + 1}`}
                onClick={() => scrollToCard(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${activeProjectIndex === idx ? 'scale-110 bg-accent' : 'bg-border'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
