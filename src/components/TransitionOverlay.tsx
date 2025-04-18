'use client';

import { motion } from 'framer-motion';

// Animation variants pour le voile de transition
const overlayVariants = {
  initial: {
    y: '100%', // Commence en-dessous de l'écran
  },
  animate: {
    y: 0, // Couvre entièrement l'écran
    transition: {
      duration: 0.5,
      ease: [0.645, 0.045, 0.355, 1.0], // Cubic bezier pour une animation plus fluide
    },
  },
  exit: {
    y: '-100%', // Sort par le haut
    transition: {
      duration: 0.5,
      ease: [0.645, 0.045, 0.355, 1.0],
    },
  },
};

export default function TransitionOverlay({ trigger }: { trigger: boolean }) {
  return (
    <motion.div
      key="page-transition-overlay"
      initial="initial"
      animate={trigger ? 'animate' : 'initial'}
      exit="exit"
      variants={overlayVariants}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        zIndex: 9999,
        pointerEvents: 'none', // Pour ne pas bloquer les interactions avec la page
        transformOrigin: 'center',
      }}
    />
  );
}
