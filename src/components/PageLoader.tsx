import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import TrueFocus from '@/components/TrueFocus'

const MIN_VISIBLE_MS = 4200
const SESSION_KEY = 'portfolio-loader-seen'

type PageLoaderProps = {
  onComplete?: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      onComplete?.()
      return
    }

    setIsVisible(true)
    const startedAt = performance.now()

    const complete = () => {
      const elapsed = performance.now() - startedAt
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed)
      window.setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, 'true')
        setIsVisible(false)
        onComplete?.()
      }, remaining)
    }

    if (document.readyState === 'complete') {
      complete()
      return
    }

    window.addEventListener('load', complete, { once: true })

    return () => window.removeEventListener('load', complete)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          aria-label="Nice To Meet You"
          aria-live="polite"
          className="page-loader"
          initial={prefersReducedMotion ? false : { opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: prefersReducedMotion ? 0.18 : 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="page-loader__focus-wrap"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <TrueFocus
              sentence="How are you today?"
              blurAmount={10}
              borderColor="#ff3b5c"
              glowColor="rgba(255, 59, 92, 0.35)"
              animationDuration={0.55}
              pauseBetweenAnimations={0.5}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
