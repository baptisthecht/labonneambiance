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

// Créer un contexte pour le système de transition
type TransitionContextType = {
  startTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  startTransition: () => {},
});

// Hook pour accéder au contexte
export const useTransition = () => useContext(TransitionContext);

// États de la transition
type TransitionState = 'idle' | 'covering' | 'changing' | 'revealing';

// Composant qui gère l'ensemble du système de transition
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [transitionState, setTransitionState] =
    useState<TransitionState>('idle');
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentPage, setCurrentPage] = useState<ReactNode>(children);
  const [nextHref, setNextHref] = useState<string | null>(null);

  // Démarrer une transition
  const startTransition = (href: string) => {
    if (transitionState !== 'idle') return;

    setNextHref(href);
    setShowOverlay(true);
    setTransitionState('covering');
  };

  // Gérer les différentes phases de la transition
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (transitionState === 'covering') {
      // Lorsque le voile monte et couvre l'écran
      timer = setTimeout(() => {
        // Le voile a couvert l'écran, nous pouvons naviguer
        if (nextHref) {
          router.push(nextHref);
          setTransitionState('changing');
        }
      }, 600); // Correspond à la durée de l'animation du voile
    } else if (transitionState === 'changing') {
      // Après avoir navigué et chargé la nouvelle page
      timer = setTimeout(() => {
        // Mettre à jour le contenu avec la nouvelle page
        setCurrentPage(children);
        setTransitionState('revealing');

        // Commencer à retirer le voile
        timer = setTimeout(() => {
          console.log('overlay no');
          setShowOverlay(false);

          // La transition est terminée
          timer = setTimeout(() => {
            setTransitionState('idle');
            setNextHref(null);
          }, 600); // Attendre que l'animation de sortie du voile soit terminée
        }, 100);
      }, 100);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [transitionState, nextHref, router, children]);

  // Mise à jour du contenu
  useEffect(() => {
    if (transitionState === 'idle') {
      setCurrentPage(children);
    }
  }, [children, transitionState]);

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      <div className="relative">
        {/* Contenu actuel */}
        <div className="transition-content">{currentPage}</div>

        {/* Voile de transition */}
        <AnimatePresence mode="wait">
          {showOverlay && (
            <motion.div
              key="transition-overlay"
              initial={{ y: '100%' }}
              animate={{
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.645, 0.045, 0.355, 1],
                },
              }}
              exit={{
                y: '-100%',
                transition: {
                  duration: 0.6,
                  ease: [0.645, 0.045, 0.355, 1],
                },
              }}
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
      </div>
    </TransitionContext.Provider>
  );
}
