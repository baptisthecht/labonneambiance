'use client';

import { MouseEvent, ReactNode } from 'react';
import { useTransition } from './TransitionSystem';

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
  const { startTransition } = useTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Empêcher la navigation immédiate
    e.preventDefault();

    // Appeler le onClick personnalisé si fourni
    if (onClick) onClick(e);

    // Démarrer la transition vers la nouvelle page
    startTransition(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
