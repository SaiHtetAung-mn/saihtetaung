import { AnimatePresence, motion, type Transition } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

type RotatingTextProps = {
  texts: string[]
  className?: string
  rotationInterval?: number
  staggerDuration?: number
  staggerFrom?: 'first' | 'last'
  splitBy?: 'characters' | 'words' | 'lines'
  loop?: boolean
  auto?: boolean
  initial?: { y: string; opacity: number }
  animate?: { y: number; opacity: number }
  exit?: { y: string; opacity: number }
  transition?: Transition
  onNext?: (nextIndex: number) => void
}

const defaultInitial = { y: '100%', opacity: 0 }
const defaultAnimate = { y: 0, opacity: 1 }
const defaultExit = { y: '-120%', opacity: 0 }

export default function RotatingText({
  texts,
  className = '',
  rotationInterval = 2000,
  staggerDuration = 0.025,
  staggerFrom = 'first',
  splitBy = 'characters',
  loop = true,
  auto = true,
  initial = defaultInitial,
  animate = defaultAnimate,
  exit = defaultExit,
  transition,
  onNext,
}: RotatingTextProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!auto || texts.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = currentIndex + 1
        const resolvedIndex = nextIndex >= texts.length ? (loop ? 0 : currentIndex) : nextIndex

        if (resolvedIndex !== currentIndex) {
          onNext?.(resolvedIndex)
        }

        return resolvedIndex
      })
    }, rotationInterval)

    return () => window.clearInterval(timer)
  }, [auto, loop, onNext, rotationInterval, texts.length])

  useEffect(() => {
    setActiveIndex((currentIndex) => (currentIndex < texts.length ? currentIndex : 0))
  }, [texts])

  const currentText = texts[activeIndex] ?? ''

  const segments = useMemo(() => {
    if (splitBy === 'words') {
      return currentText.split(/(\s+)/)
    }

    if (splitBy === 'lines') {
      return currentText.split(/\n+/)
    }

    return Array.from(currentText)
  }, [currentText, splitBy])

  const orderedSegments = staggerFrom === 'last' ? [...segments].reverse() : segments

  return (
    <span className={`inline-flex flex-col overflow-hidden align-middle ${className}`} aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          aria-label={currentText}
          className="inline-flex flex-wrap"
          initial="hidden"
          animate="visible"
          exit="hidden"
          key={`${activeIndex}-${currentText}`}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: staggerDuration,
                staggerDirection: staggerFrom === 'last' ? -1 : 1,
              },
            },
          }}
        >
          {orderedSegments.map((segment, index) => {
            const isWhitespace = splitBy === 'words' ? /^\s+$/.test(segment) : false
            const displayText = splitBy === 'characters' && segment === ' ' ? '\u00A0' : segment

            return (
              <motion.span
                aria-hidden="true"
                className="inline-block will-change-transform"
                key={`${segment}-${index}`}
                variants={{
                  hidden: initial,
                  visible: {
                    ...animate,
                    transition: transition ?? { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                  exit,
                }}
              >
                {isWhitespace ? '\u00A0' : displayText}
                {splitBy === 'words' && !isWhitespace && index < orderedSegments.length - 1 ? '\u00A0' : null}
              </motion.span>
            )
          })}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}