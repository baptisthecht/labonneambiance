'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import TransitionOverlay from './TransitionOverlay';

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedContent, setDisplayedContent] = useState(children);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      // Début de la transition : on garde l’ancien contenu visible
      setIsTransitioning(true);

      // Laisser le voile monter
      const delay = 500;

      const timeout = setTimeout(() => {
        // Une fois le voile en haut → on change le contenu
        setDisplayedContent(children);
        previousPath.current = pathname;

        // Laisser le temps au voile de repartir
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500); // durée du exit
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      // première fois ou navigation pas changée → on sync le contenu direct
      setDisplayedContent(children);
    }
  }, [pathname, children]);

  return (
    <>
      {displayedContent}
      <TransitionOverlay trigger={isTransitioning} />
    </>
  );
}
