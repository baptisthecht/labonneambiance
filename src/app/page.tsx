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
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);
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
