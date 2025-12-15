'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface StepTransitionProps {
  children: ReactNode
  stepKey: number | string
}

export default function StepTransition({ children, stepKey }: StepTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ 
          width: '100%', 
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

