'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function TransitionLink({ href, children, className }: Props) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Déclenche un événement custom que le composant TransitionOverlay va écouter
    document.dispatchEvent(new Event('startTransition'));

    setTimeout(() => {
      router.push(href);
    }, 500); // attendre que le voile recouvre l'écran
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
