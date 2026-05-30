import { motion, type Variants } from 'framer-motion'

type BlurTextProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  by?: 'word' | 'character'
}

export default function BlurText({
  text,
  className = '',
  delay = 0,
  stagger = 0.045,
  by = 'word',
}: BlurTextProps) {
  const segments = by === 'character' ? Array.from(text) : text.split(' ')

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  }

  const segmentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.span
      aria-label={text}
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {segments.map((segment, index) => {
        const key = `${segment}-${index}`
        const content = segment === ' ' ? '\u00A0' : segment

        return (
          <motion.span
            aria-hidden="true"
            className="inline-block will-change-[transform,filter,opacity]"
            key={key}
            variants={segmentVariants}
          >
            {content}
            {by === 'word' && index < segments.length - 1 ? '\u00A0' : null}
          </motion.span>
        )
      })}
    </motion.span>
  )
}
