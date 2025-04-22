import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

export function RollingText() {
  const words = useMemo(
    () => ['entente', 'vibe', 'idée', 'équipe', 'attitude'],
    []
  );
  const wordColors = [
    'text-blue-600',
    'text-purple-600',
    'text-green-600',
    'text-orange-600',
    'text-red-600',
  ];
  const { scrollYProgress } = useScroll();
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  // Configuration de l'effet aimanté
  const scrollSegments = useMemo(() => {
    return words.map((_, i) => i / (words.length - 1));
  }, [words]);

  // Transformer le défilement en index de mot
  const snappedProgress = useTransform(
    scrollYProgress,
    scrollSegments,
    scrollSegments
  );

  // Transformer le défilement en position Y
  const y = useTransform(
    snappedProgress,
    scrollSegments,
    words.map((_, i) => -i * 40) // 40px est la hauteur de chaque mot
  );

  // Utiliser useEffect pour mettre à jour l'index du mot actif
  useEffect(() => {
    const unsubscribe = snappedProgress.onChange((latest) => {
      // Trouver l'index le plus proche
      const closest = scrollSegments.reduce(
        (prev, curr, index) => {
          return Math.abs(curr - latest) < Math.abs(prev.val - latest)
            ? { val: curr, index }
            : prev;
        },
        { val: Infinity, index: 0 }
      );

      setActiveWordIndex(closest.index);
    });

    return () => unsubscribe();
  }, [snappedProgress, scrollSegments]);

  // Générer des carrés aléatoires pour chaque mot
  const squaresByWord = useMemo(() => {
    return words.map((_, wordIndex) => {
      return Array.from({ length: 5 }).map((_, i) => ({
        id: `square-${wordIndex}-${i}`,
        size: 20 + Math.random() * 60,
        rotation: Math.random() * 360,
        x: Math.random() * 140 - 70, // -70 à 70 pour centrer autour du texte
        y: Math.random() * 140 - 70,
        delay: i * 0.1,
        opacity: 0.5 + Math.random() * 0.5,
        color: [
          'bg-blue-300',
          'bg-purple-300',
          'bg-green-300',
          'bg-orange-300',
          'bg-red-300',
        ][wordIndex % 5],
      }));
    });
  }, [words]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Conteneur principal centré */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        {/* Carrés décoratifs avec animation */}
        <div className="absolute inset-0 -z-10 ">
          <AnimatePresence>
            {squaresByWord[activeWordIndex].map((square) => (
              <motion.div
                key={square.id}
                className={`absolute ${square.color}`}
                style={{
                  width: square.size,
                  height: square.size,
                  opacity: square.opacity,
                  x: square.x,
                  y: square.y,
                  rotate: square.rotation,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: square.opacity }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: square.delay,
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Texte avec effet aimanté */}
        <div className="flex justify-center items-center">
          <p className="text-3xl font-bold mr-1">La bonne </p>
          <div className="h-10 overflow-hidden">
            <motion.div
              style={{ y }}
              className="flex flex-col items-center"
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                restDelta: 0.001,
              }}
            >
              {words.map((word, index) => (
                <p
                  key={word}
                  className={`text-3xl font-bold h-10 flex items-center
                    ${index === activeWordIndex ? wordColors[index] : 'text-gray-400'}`}
                >
                  {word}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Espace permettant de scroller */}
      <div className="h-[2000px] w-full"></div>
    </div>
  );
}
