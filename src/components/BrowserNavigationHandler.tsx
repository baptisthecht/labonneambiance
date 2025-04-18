'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useTransition } from './TransitionSystem';

/**
 * Composant qui gère les événements de navigation du navigateur (boutons retour/avancer)
 */
export default function BrowserNavigationHandler() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const { startTransition } = useTransition();
  const router = useRouter();

  useEffect(() => {
    // Pour empêcher la navigation automatique du navigateur lors de l'utilisation des boutons retour/avancer
    const handlePopState = (event: PopStateEvent) => {
      // Empêcher la navigation par défaut
      event.preventDefault();

      // Récupérer l'URL cible
      const targetUrl = window.location.pathname;

      // Déclencher notre propre transition
      if (targetUrl !== pathname) {
        startTransition(targetUrl);
      }
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener('popstate', handlePopState);

    // Nettoyage
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname, startTransition]);

  // Effet pour gérer les changements de chemin
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
    }
  }, [pathname]);

  // Ce composant ne rend rien visuellement
  return null;
}
