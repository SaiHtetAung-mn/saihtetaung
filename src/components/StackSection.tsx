import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  idx?: number
}

export default function StackSection({ children, idx = 0 }: Props) {
  return (
    <motion.section
      initial={false}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.08 }}
      className={`min-h-screen flex items-center justify-center relative`}
      style={{ zIndex: 10 + idx }}
    >
      <div className={`w-full`}>{children}</div>
    </motion.section>
  )
}
