import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiGithub } from 'react-icons/fi'
import meImage from '@/assets/me-primary.jpg'
import BlurText from '@/components/BlurText';
import DotFieldBackground from '@/components/DotFieldBackground';
import AntigravityBackground from '@/components/AntigravityBackground';
import TechIconBackground, { type TechIconSeed } from '@/components/TechIconBackground';
import ImageWithSkeleton from '@/components/ImageWithSkeleton';
import RotatingText from '@/components/RotatingText';
import TextType from '@/components/TextType';
import { useTheme } from '@/context/ThemeContext';
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

type LandingBackground = 'dot-field' | 'antigravity' | 'tech-icons'

const landingTechIcons: TechIconSeed[] = [
  { Icon: SiTypescript, x: 0.08, y: 0.08, size: 42 },
  { Icon: SiNodedotjs, x: 0.18, y: 0.16, size: 42 },
  { Icon: SiNestjs, x: 0.3, y: 0.08, size: 48 },
  { Icon: SiExpress, x: 0.42, y: 0.18, size: 38 },
  { Icon: SiLaravel, x: 0.54, y: 0.1, size: 42 },
  { Icon: SiSocketdotio, x: 0.66, y: 0.18, size: 36 },
  { Icon: SiMongodb, x: 0.78, y: 0.1, size: 48 },
  { Icon: SiPostgresql, x: 0.9, y: 0.2, size: 42 },
  { Icon: SiMysql, x: 0.12, y: 0.32, size: 42 },
  { Icon: SiRedis, x: 0.24, y: 0.4, size: 36 },
  { Icon: SiReact, x: 0.36, y: 0.3, size: 54 },
  { Icon: SiRedux, x: 0.5, y: 0.38, size: 40 },
  { Icon: SiVite, x: 0.64, y: 0.3, size: 42 },
  { Icon: SiMui, x: 0.76, y: 0.42, size: 38 },
  { Icon: SiJquery, x: 0.88, y: 0.34, size: 38 },
  { Icon: SiHtml5, x: 0.18, y: 0.56, size: 42 },
  { Icon: SiTailwindcss, x: 0.34, y: 0.5, size: 52 },
  { Icon: SiDocker, x: 0.48, y: 0.58, size: 44 },
  { Icon: SiLinux, x: 0.62, y: 0.52, size: 42 },
  { Icon: SiGit, x: 0.76, y: 0.6, size: 38 },
  { Icon: SiAmazon, x: 0.9, y: 0.54, size: 38 },
  { Icon: SiNginx, x: 0.28, y: 0.7, size: 38 },
  { Icon: SiJira, x: 0.58, y: 0.72, size: 38 },
  { Icon: SiPostman, x: 0.82, y: 0.74, size: 38 },
]

const landingMobileTechIcons: TechIconSeed[] = [
  { Icon: SiNestjs, x: 0.18, y: 0.08, size: 44 },
  { Icon: SiMongodb, x: 0.78, y: 0.12, size: 46 },
  { Icon: SiDocker, x: 0.28, y: 0.34, size: 44 },
  { Icon: SiLinux, x: 0.68, y: 0.38, size: 42 },
]

type LandingProps = {
  isPageLoaded?: boolean
}

export function Landing({ isPageLoaded = true }: LandingProps) {
  const { theme } = useTheme()
  const [background, setBackground] = useState<LandingBackground | null>(null)
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const isDark = theme === 'dark'
  const dotFieldTheme = isDark
    ? {
        gradientFrom: 'rgba(255, 255, 255, 0.45)',
        gradientTo: 'rgba(231, 226, 227, 0.35)',
        glowColor: '#0b1220',
      }
    : {
        gradientFrom: 'rgba(3, 3, 3, 0.45)',
        gradientTo: 'rgba(25, 59, 92, 0.35)',
        glowColor: '#ffffff',
      }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55 },
    },
  }

  useEffect(() => {
    const backgrounds: LandingBackground[] = ['dot-field', 'antigravity', 'tech-icons']
    setBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)])
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const syncViewport = () => setIsMobileViewport(mediaQuery.matches)

    syncViewport()
    mediaQuery.addEventListener('change', syncViewport)

    return () => mediaQuery.removeEventListener('change', syncViewport)
  }, [])

  const renderBackground = () => {
    if (!isPageLoaded) return null

    if (background === 'dot-field') {
      return (
        <DotFieldBackground
          className="pointer-events-none absolute inset-0 opacity-100"
          dotRadius={1.9}
          dotSpacing={20}
          cursorRadius={420}
          bulgeOnly
          bulgeStrength={72}
          glowRadius={220}
          sparkle
          waveAmplitude={1}
          {...dotFieldTheme}
        />
      )
    }

    if (background === 'antigravity') {
      return (
        <div className="absolute inset-0 h-[100svh] w-full md:h-full">
          <AntigravityBackground
            count={300}
            color={isDark ? '#ffffff' : '#ff3b5c'}
            magnetRadius={7.5}
            ringRadius={7}
            waveSpeed={0.5}
            waveAmplitude={1}
            particleSize={1.35}
            particleVariance={1}
            lerpSpeed={0.07}
            autoAnimate={false}
            rotationSpeed={0}
            depthFactor={1}
            pulseSpeed={3}
            particleShape="sphere"
            fieldStrength={8}
          />
        </div>
      )
    }

    if (background === 'tech-icons') {
      return (
        <TechIconBackground
          className="bottom-auto h-[100svh] md:bottom-0 md:h-full"
          icons={isMobileViewport ? landingMobileTechIcons : landingTechIcons}
          iconClassName={isDark ? 'text-white/14' : 'text-accent/20'}
          cursorRadius={140}
          cursorForce={0.75}
          gravity={0.1}
          friction={0.991}
          wallBounce={0.55}
          floorFriction={0.985}
          collisionStrength={0.48}
          recycleSettledIcons={false}
          alwaysFloatingRatio={0}
          floatingRatio={0.18}
          bouncyRatio={0.42}
          bounceRestitution={0.38}
          bouncyRestitution={0.82}
          impactSpin={0.016}
          maxSpeed={8}
          rotateOnImpact
          floatAreaMinY={0.62}
          floatAreaMaxY={0.88}
          floatStrength={0.045}
          floatDrift={18}
        />
      )
    }

    return null
  }

  return (
    <section
      id="landing"
      className={`hero-landing relative min-h-screen flex items-start justify-center pt-20 sm:pt-16 md:items-center overflow-hidden ${isDark ? 'hero-landing--dark' : 'hero-landing--light'}`}
    >
      {renderBackground()}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isPageLoaded ? 'visible' : 'hidden'}
        className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pb-14 md:pb-24"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-12 items-center">
          <motion.div
            variants={itemVariants}
            className="flex justify-center order-first md:order-last"
          >
            <motion.div
              initial="initial"
              animate={isPageLoaded ? 'rest' : 'initial'}
              whileHover="hover"
              className="hero-portrait"
              variants={{
                initial: { opacity: 0, scale: 0.86, y: 18 },
                rest: { opacity: 1, scale: 1, y: 0 },
                hover: { y: -4, scale: 1.012 },
              }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            >
              <div className="hero-portrait__image">
                <ImageWithSkeleton
                  src={meImage}
                  alt="Sai Htet Aung | Portfolio"
                  className="w-full h-full object-cover object-[50%_35%]"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`relative z-20 order-last text-center md:order-first md:text-left ${
              background === 'tech-icons' ? 'hero-copy-mobile-scrim' : ''
            }`}
          >
            <h1 className="hero-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
              Hi, I'm
            </h1>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 overflow-hidden whitespace-nowrap font-mono">
              {isPageLoaded ? (
                <BlurText
                  key="loaded-name"
                  text="Sai Htet Aung"
                  by="character"
                  delay={0.35}
                  stagger={0.035}
                  className="hero-name"
                />
              ) : (
                <span className="hero-name opacity-0">Sai Htet Aung</span>
              )}
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isPageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
              className="hero-role text-lg sm:text-xl mb-3"
            >
              {isPageLoaded ? (
                <RotatingText
                  key="loaded-role"
                  texts={['Fullstack Developer', 'Software Engineer']}
                  className="text-accent font-mono"
                  rotationInterval={4400}
                  staggerDuration={0.03}
                  splitBy="characters"
                />
              ) : (
                <span className="text-accent font-mono opacity-0">Fullstack Developer</span>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isPageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
              className="hero-description max-w-xl mx-auto md:mx-0 text-base sm:text-lg mb-8 leading-relaxed"
            >
              {isPageLoaded ? (
                <TextType
                  key="loaded-description"
                  texts={['I ship full-stack solutions from robust backends to polished frontends.']}
                  typingSpeed={36}
                  startDelay={1300}
                  loop={false}
                  showCursor={false}
                />
              ) : (
                <span className="opacity-0">I ship full-stack solutions from robust backends to polished frontends.</span>
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isPageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
              className="flex flex-row flex-wrap gap-3 justify-center md:justify-start"
            >
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                href='https://github.com/SaiHtetAung-mn'
                target='_blank'
                rel="noopener noreferrer"
                className="hero-button hero-button--icon hero-button--ghost"
                aria-label="Open GitHub profile"
                title="GitHub"
              >
                <FiGithub className="h-5 w-5 md:h-8 md:w-8" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
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
          animate={isPageLoaded ? { y: [0, 6, 0] } : { y: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 justify-center pointer-events-none md:flex"
        >
          <svg className="w-6 h-6 text-current opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
