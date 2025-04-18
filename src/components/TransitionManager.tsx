'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function TransitionManager() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      // Navigation détectée (avant que la nouvelle page s’affiche)
      document.dispatchEvent(new Event('startTransition'));
      previousPath.current = pathname;
    }
  }, [pathname]);

  return null;
}
