import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const MIN_VISIBLE_MS = 3000

type PageLoaderProps = {
  onComplete?: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const startedAt = performance.now()

    const complete = () => {
      const elapsed = performance.now() - startedAt
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed)
      window.setTimeout(() => {
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
          aria-label="Loading portfolio"
          aria-live="polite"
          className="page-loader"
          initial={prefersReducedMotion ? false : { opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: prefersReducedMotion ? 0.18 : 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="page-loader__mark"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="page-loader__accent">_</span>Aung
          </motion.div>
          <div className="page-loader__track" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
