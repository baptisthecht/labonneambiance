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
};

// Création du contexte
const TransitionContext = createContext<TransitionContextType>({
  startPageTransition: () => {},
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
    if (isTransitioning) return;

    console.log('Starting transition to:', url);
    setTargetUrl(url);
    setIsTransitioning(true);
    setPhase('covering');
  };

  // Effet pour gérer les phases de transition
  useEffect(() => {
    if (phase === 'covering' && targetUrl) {
      // La phase 'covering' est gérée par l'animation du voile
      console.log('Phase: covering');
    } else if (phase === 'uncovering') {
      console.log('Phase: uncovering');
      // La phase 'uncovering' est gérée par l'animation du voile
      // Une fois terminée, on revient à 'idle' grâce à l'événement onAnimationComplete
    }
  }, [phase, targetUrl]);

  // Mise à jour du contenu affiché quand les enfants changent et qu'on n'est pas en transition
  useEffect(() => {
    if (phase === 'idle') {
      setDisplayedChildren(children);
    }
  }, [children, phase]);

  // Gestionnaire pour quand le voile a fini de monter
  const handleCoveringComplete = () => {
    console.log('Covering animation completed, navigating to:', targetUrl);
    if (targetUrl) {
      router.push(targetUrl);

      // Mettre à jour le contenu après la navigation
      setTimeout(() => {
        console.log('Updating content and starting uncovering phase');
        setDisplayedChildren(children);
        setPhase('uncovering');
      }, 100); // Petit délai pour s'assurer que le contenu est prêt
    }
  };

  // Gestionnaire pour quand le voile a fini de descendre
  const handleUncoveringComplete = () => {
    console.log('Uncovering animation completed, transition finished');
    setIsTransitioning(false);
    setTargetUrl(null);
    setPhase('idle');
  };

  return (
    <TransitionContext.Provider value={{ startPageTransition }}>
      <div className="relative">
        {/* Contenu actuel de la page */}
        <div className="page-content">{displayedChildren}</div>

        {/* Voile de transition */}
        <AnimatePresence mode="wait">
          {phase !== 'idle' && (
            <motion.div
              key="page-transition-overlay"
              initial={{ y: phase === 'covering' ? '100%' : 0 }}
              animate={{
                y: phase === 'covering' ? 0 : '-100%',
                transition: {
                  duration: 0.7,
                  ease: [0.43, 0.13, 0.23, 0.96], // Courbe d'accélération personnalisée
                },
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
