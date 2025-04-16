'use client';
import { Main } from '@/components/Main';
import { AnimatePresence } from 'framer-motion';
import ReactLenis from 'lenis/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Importer dynamiquement le composant d'animation pour éviter les problèmes de SSR
const IntroAnimation = dynamic(() => import('@/components/IntroAnimation'), {
  ssr: false,
});

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  useEffect(() => {
    // Après un certain délai, on cachera l'animation d'intro
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000); // Réduit pour déclencher la sortie plus tôt

    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis root>
      <main className="min-h-dvh bg-silver flex flex-col">
        <AnimatePresence mode="wait">
          {showIntro ? <IntroAnimation key="intro" /> : <Main />}
        </AnimatePresence>
      </main>
    </ReactLenis>
  );
}
