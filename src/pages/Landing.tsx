import { motion } from 'framer-motion'
import meImage from '../assets/me-primary.jpg'
import ImageWithSkeleton from '../components/ImageWithSkeleton';

export function Landing() {
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
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 pt-16"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image - Top on mobile, Right on desktop */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center order-first md:order-last"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Decorative background blur with vintage sepia touch */}
              <div className="absolute -inset-8 bg-gradient-to-r from-yellow-100/20 to-yellow-50/20 dark:from-slate-950 dark:to-gray-900 rounded-2xl blur-3xl opacity-30 dark:opacity-40 -z-10" />
              
              {/* Main image container with vintage frame */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border-8 border-yellow-50 dark:border-gray-800">
                {/* Image with skeleton loader */}
                <ImageWithSkeleton
                  src={meImage}
                  alt="Sai Htet Aung | Portfolio"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Vintage-style outer frame effect with subtle shadow */}
              <div className="absolute -inset-1 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl bg-gradient-to-br from-gray-200/30 to-gray-300/20 dark:from-gray-700/40 dark:to-gray-800/30 pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Text Content - Left */}
          <motion.div variants={itemVariants} className="text-center md:text-left order-last md:order-first">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Hi, I'm
            </h1>
            
            {/* Typewriter Animated Name */}
            <motion.h2
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-700 dark:text-slate-300 mb-6 overflow-hidden whitespace-nowrap"
              style={{ fontFamily: 'monospace' }}
            >
              Sai Htet Aung
            </motion.h2>

            {/* Typewriter Animated Position */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 2 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-3 overflow-hidden whitespace-nowrap"
            >
              Full‑Stack Engineer
            </motion.div>

            {/* Animated Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 3.5 }}
              className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed"
            >
              I ship full-stack solutions—from robust backends to polished frontends.
            </motion.p>

            {/* Animated Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 4.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-slate-800 dark:bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors shadow-lg hover:shadow-xl"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-slate-800 dark:border-slate-600 text-slate-800 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 flex justify-center"
        >
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
