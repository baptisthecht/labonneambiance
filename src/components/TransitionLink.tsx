'use client';

import { MouseEvent, ReactNode } from 'react';
import { usePageTransition } from './PageTransitionSystem';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
}: TransitionLinkProps) {
  const { startPageTransition } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Exécuter le onClick personnalisé si fourni
    if (onClick) onClick(e);

    // Démarrer la transition vers la nouvelle page
    startPageTransition(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
