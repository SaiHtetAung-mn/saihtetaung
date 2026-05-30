import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type TitleSegment = {
  text: string
  accent?: boolean
}

type ScrollFloatTitleProps = {
  segments: TitleSegment[]
  className?: string
  as?: 'h2' | 'h3'
}

const titleVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
    },
  },
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function ScrollFloatTitle({
  segments,
  className = '',
  as = 'h2',
}: ScrollFloatTitleProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLHeadingElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const isInView = useInView(ref, { once: true, amount: 0.12, margin: '0px 0px -6% 0px' })
  const MotionTag = as === 'h3' ? motion.h3 : motion.h2
  const shouldAnimate = !prefersReducedMotion
  const shouldShow = isMobile || isInView

  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsMobile(window.matchMedia('(max-width: 767px)').matches)
  }, [])

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={shouldAnimate ? 'hidden' : 'visible'}
      animate={shouldAnimate ? (shouldShow ? 'visible' : 'hidden') : 'visible'}
      variants={titleVariants}
    >
      {segments.map((segment, segmentIndex) => {
        const words = segment.text.split(' ')

        return words.map((word, wordIndex) => {
          const isLastSegment = segmentIndex === segments.length - 1
          const isLastWord = wordIndex === words.length - 1

          return (
            <motion.span
              key={`${segment.text}-${word}-${wordIndex}`}
              className={`inline-block will-change-transform ${
                segment.accent ? 'text-accent' : ''
              }`}
              variants={wordVariants}
            >
              {word}
              {isLastSegment && isLastWord ? null : '\u00A0'}
            </motion.span>
          )
        })
      })}
    </MotionTag>
  )
}
