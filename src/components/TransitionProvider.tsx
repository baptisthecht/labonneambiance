'use client';

import { usePathname } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const TransitionContext = createContext({ isTransitioning: false });

export function useTransitioning() {
  return useContext(TransitionContext);
}

export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showChildren, setShowChildren] = useState(true);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      setIsTransitioning(true);
      setShowChildren(false);
      document.dispatchEvent(new Event('startTransition'));

      setTimeout(() => {
        setShowChildren(true); // on affiche la nouvelle page une fois le voile en place
      }, 500); // temps du voile noir qui monte

      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000); // voile redescendu
    }

    previousPath.current = pathname;
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ isTransitioning }}>
      <>{showChildren && children}</>
    </TransitionContext.Provider>
  );
}
