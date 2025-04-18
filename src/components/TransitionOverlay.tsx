'use client';

import { AnimatePresence, motion } from 'framer-motion';

const variants = {
  initial: { y: '100%' },
  animate: { y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { y: '-100%', transition: { duration: 0.5, ease: 'easeInOut' } },
};

export default function TransitionOverlay({ trigger }: { trigger: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {trigger && (
        <motion.div
          key="overlay"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
}
