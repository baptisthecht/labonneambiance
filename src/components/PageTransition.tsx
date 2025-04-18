'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import TransitionOverlay from './TransitionOverlay';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // État pour gérer la transition
  const [isTransitioning, setIsTransitioning] = useState(false);

  // État pour stocker le contenu actuel et précédent
  const [displayedChildren, setDisplayedChildren] = useState(children);

  useEffect(() => {
    // Vérifier si le chemin a changé
    if (previousPathname.current !== pathname) {
      // Début de la transition - on garde l'ancien contenu visible
      setIsTransitioning(true);

      // Phase 1: Le voile monte (500ms)
      const timeoutToChangeContent = setTimeout(() => {
        // Une fois que le voile a couvert l'écran, on change le contenu
        setDisplayedChildren(children);

        // Phase 2: Le voile redescend (500ms)
        const timeoutToFinishTransition = setTimeout(() => {
          setIsTransitioning(false);
          previousPathname.current = pathname;
        }, 500);

        return () => clearTimeout(timeoutToFinishTransition);
      }, 500);

      return () => clearTimeout(timeoutToChangeContent);
    } else {
      // Premier rendu ou retour à la même page
      setDisplayedChildren(children);
    }
  }, [pathname, children]);

  return (
    <>
      {displayedChildren}
      <TransitionOverlay trigger={isTransitioning} />
    </>
  );
}
