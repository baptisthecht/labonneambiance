import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroAnimation() {
  // Utiliser un état pour monter le composant seulement côté client
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Ne rien rendre si le composant n'est pas monté (côté serveur)
  if (!isMounted) return null;

  const text = 'la bonne ambiance* ';

  // Modification des variants du conteneur pour ajouter le déplacement vers le haut
  const containerVariants: Variants = {
    initial: {
      height: '100dvh',
      y: 0,
    },
    exit: {
      height: 0,
      y: -50, // Déplacement vers le haut pendant la réduction de hauteur
      transition: {
        height: {
          duration: 0.7,
          ease: [0.9, 0.01, 0.95, 0.9],
        },
        y: {
          duration: 0.7, // Même durée que la réduction de hauteur
          ease: 'easeOut',
        },
      },
    },
  };

  // Animation globale du texte qui monte de 100px
  const textContainerVariants: Variants = {
    initial: { y: 100 },
    animate: {
      y: -50,
      transition: {
        duration: 4,
        ease: 'easeOut',
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.4,
      },
    },
  };

  const letterVariants = {
    initial: {
      y: 500,
      opacity: 0,
      filter: 'blur(50px)',
      scale: 0.7,
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.1, 0.8, 0.2, 0.95],
        opacity: { duration: 0.7, ease: [0, 0.9, 0.2, 1] },
        filter: { duration: 0.6, ease: [0, 0.85, 0.25, 1] },
      },
    },
  };
  //  bg-[url(/background.png)]
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden z-50 bg-cover bg-center bg-black"
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      {/* Conteneur avec animation de déplacement vers le haut */}
      <motion.div
        className="relative"
        variants={textContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className={'text-white text-3xl md:text-5xl font-bold font-poppins'}
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              variants={letterVariants}
              style={{
                display: 'inline-block',
                willChange: 'transform, opacity, filter',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
