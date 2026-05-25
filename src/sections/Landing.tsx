import { motion } from 'framer-motion'
import { FiDownload, FiGithub } from 'react-icons/fi'
import meImage from '../assets/me-primary.jpg'
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import Particles from '../components/Particles';
import ShinyText from '../components/ShinyText';
import TextType from '../components/TextType';
import { useTheme } from '../context/ThemeContext';

export function Landing() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section
      id="landing"
      className={`hero-landing relative min-h-screen flex items-center justify-center pt-16 overflow-hidden ${isDark ? 'hero-landing--dark' : 'hero-landing--light'}`}
    >
      <div
        aria-hidden="true"
        className="hero-landing__background absolute inset-0 z-0 pointer-events-none"
      >
        <Particles
          key={theme}
          particleCount={900}
          particleSpread={12}
          speed={0.55}
          particleColors={isDark ? ['#9ca3af'] : ['#111827']}
          particleBaseSize={115}
          sizeRandomness={1.6}
          moveParticlesOnHover={false}
          alphaParticles
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            variants={itemVariants}
            className="flex justify-center order-first md:order-last"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="hero-portrait"
            >
              <div className="hero-portrait__ring" />
              <div className="hero-portrait__image">
                <ImageWithSkeleton
                  src={meImage}
                  alt="Sai Htet Aung | Portfolio"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center md:text-left order-last md:order-first">
            <p className="hero-kicker">Full-stack portfolio</p>
            <h1 className="hero-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
              Hi, I'm
            </h1>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 overflow-hidden whitespace-nowrap font-mono">
              <TextType
                texts={['Sai Htet Aung']}
                typingSpeed={85}
                startDelay={350}
                className="hero-name-type"
                renderText={(text) => (
                  <ShinyText text={text || '\u00A0'} className="hero-name" speed={3.4} />
                )}
              />
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 1.2 }}
              className="hero-role text-lg sm:text-xl mb-3"
            >
              <TextType
                texts={['Full-Stack Engineer']}
                typingSpeed={60}
                startDelay={1500}
                cursorCharacter="_"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 1.45 }}
              className="hero-description max-w-xl mx-auto md:mx-0 text-base sm:text-lg mb-8 leading-relaxed"
            >
              I ship full-stack solutions—from robust backends to polished frontends.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 1.7 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href='https://github.com/SaiHtetAung-mn'
                target='__blank'
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-button hero-button--ghost"
              >
                <FiGithub className="h-5 w-5" />
                GitHub
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-button hero-button--outline"
              >
                Hire Me
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="hero-button hero-button--primary"
              >
                <FiDownload className="h-5 w-5" />
                Get Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center pointer-events-none"
        >
          <svg className="w-6 h-6 text-amber-200/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
