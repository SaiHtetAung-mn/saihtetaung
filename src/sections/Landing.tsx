import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiGithub } from 'react-icons/fi'
import meImage from '@/assets/me-primary.jpg'
import BlurText from '@/components/BlurText';
import DotFieldBackground from '@/components/DotFieldBackground';
import LightRays from '@/components/LightRayBackground';
import Ballpit from '@/components/BallSpitBackground';
import ImageWithSkeleton from '@/components/ImageWithSkeleton';
import RotatingText from '@/components/RotatingText';
import TextType from '@/components/TextType';
import { useTheme } from '@/context/ThemeContext';

type LandingBackground = 'dot-field' | 'light-rays' | 'ballpit'

export function Landing() {
  const { theme } = useTheme()
  const [background, setBackground] = useState<LandingBackground | null>(null)
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
    const backgrounds: LandingBackground[] = ['dot-field', 'light-rays', 'ballpit']
    setBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)])
  }, [])

  const renderBackground = () => {
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

    if (background === 'light-rays') {
      return (
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0}
          distortion={0}
          className="absolute inset-0 h-full w-full custom-rays"
          pulsating
          fadeDistance={1}
          saturation={1.2}
        />
      )
    }

    if (background === 'ballpit') {
      return (
        <Ballpit
          className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
          count={20}
          colors={isDark ? [0xffffff] : [0xff3b5c]}
          ambientColor={0xffffff}
          gravity={0.1}
          friction={0.969}
          wallBounce={0.6}
          followCursor
        />
      )
    }

    return null
  }

  return (
    <section
      id="landing"
      className={`hero-landing relative min-h-screen flex items-center justify-center pt-24 sm:pt-16 overflow-hidden ${isDark ? 'hero-landing--dark' : 'hero-landing--light'}`}
    >
      {renderBackground()}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            variants={itemVariants}
            className="mt-4 flex justify-center order-first md:order-last md:mt-0"
          >
            <motion.div
              initial="initial"
              animate="rest"
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
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center md:text-left order-last md:order-first">
            <h1 className="hero-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
              Hi, I'm
            </h1>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 overflow-hidden whitespace-nowrap font-mono">
              <BlurText
                text="Sai Htet Aung"
                by="character"
                delay={0.35}
                stagger={0.035}
                className="hero-name"
              />
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
              className="hero-role text-lg sm:text-xl mb-3"
            >
              <RotatingText
                texts={['Fullstack Developer', 'Software Engineer']}
                className="text-accent font-mono"
                rotationInterval={4400}
                staggerDuration={0.03}
                splitBy="characters"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
              className="hero-description max-w-xl mx-auto md:mx-0 text-base sm:text-lg mb-8 leading-relaxed"
            >
              <TextType
                texts={['I ship full-stack solutions from robust backends to polished frontends.']}
                typingSpeed={36}
                startDelay={1300}
                loop={false}
                showCursor={false}
              />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start"
            >
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                href='https://github.com/SaiHtetAung-mn'
                target='__blank'
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-button hero-button--ghost"
              >
                <FiGithub className="h-5 w-5" />
                GitHub
              </motion.a>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-button hero-button--outline"
              >
                Hire Me
              </motion.button>
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
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center pointer-events-none"
        >
          <svg className="w-6 h-6 text-current opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
