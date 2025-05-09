'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// Types pour le contexte
type TransitionContextType = {
  startPageTransition: (url: string) => void;
  isTransitioning: boolean;
};

// Création du contexte
const TransitionContext = createContext<TransitionContextType>({
  startPageTransition: () => {},
  isTransitioning: false,
});

// Hook pour utiliser le contexte de transition
export const usePageTransition = () => useContext(TransitionContext);

// Composant principal de gestion des transitions
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [phase, setPhase] = useState<'idle' | 'covering' | 'uncovering'>(
    'idle'
  );

  // Fonction pour démarrer une transition de page
  const startPageTransition = (url: string) => {
    // Ne rien faire si déjà en transition
    if (isTransitioning) return;

    console.log('Démarrage de la transition vers:', url);
    setTargetUrl(url);
    setIsTransitioning(true);
    setPhase('covering');
  };

  // Mise à jour du contenu affiché quand les enfants changent et qu'on n'est pas en transition
  useEffect(() => {
    if (phase === 'idle') {
      setDisplayedChildren(children);
    }
  }, [children, phase]);

  // Gestionnaire pour quand le voile a fini de monter
  const handleCoveringComplete = () => {
    console.log('Voile complètement monté, navigation vers:', targetUrl);
    if (targetUrl) {
      // Navigation vers la nouvelle URL
      router.push(targetUrl);

      // Attendre un court instant pour que le nouveau contenu soit chargé
      setTimeout(() => {
        console.log(
          'Mise à jour du contenu et début de la phase de découverte'
        );
        setDisplayedChildren(children);
        setPhase('uncovering');
      }, 50); // Délai très court pour une transition rapide
    }
  };

  // Gestionnaire pour quand le voile a fini de descendre
  const handleUncoveringComplete = () => {
    console.log('Animation terminée, transition complète');
    setIsTransitioning(false);
    setTargetUrl(null);
    setPhase('idle');
  };

  return (
    <TransitionContext.Provider
      value={{ startPageTransition, isTransitioning }}
    >
      <div className="relative">
        {/* Contenu actuel de la page */}
        <motion.div
          className="page-content"
          animate={{
            y: phase === 'covering' ? '-240px' : 0,
            transition: {
              duration: phase === 'covering' ? 0.4 : 0,
              ease: [0.62, 0, 0.66, 1.05],
            },
          }}
        >
          {displayedChildren}
        </motion.div>

        {/* Voile de transition */}
        <AnimatePresence mode="wait">
          {phase !== 'idle' && (
            <motion.div
              key="page-transition-overlay"
              initial={{ y: '100%' }}
              animate={{
                y: phase === 'covering' ? 0 : '-100%',
              }}
              transition={{
                type: 'tween',
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              onAnimationComplete={() => {
                if (phase === 'covering') {
                  handleCoveringComplete();
                } else if (phase === 'uncovering') {
                  handleUncoveringComplete();
                }
              }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#0f0f0f',
                zIndex: 9999,
                pointerEvents: 'none',
                transform: 'translateZ(0)',
                willChange: 'transform',
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </TransitionContext.Provider>
  );
}
