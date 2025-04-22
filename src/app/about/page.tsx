'use client';
import { Nav } from '@/components/Nav';
import { RollingText } from '@/components/RollingText';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <div>
      <Nav />
      <div className="h-80"></div>
      <motion.div
        initial={{
          y: 200,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: [0.25, 1.19, 0.92, 0.96],
          duration: 1,
        }}
      >
        <RollingText />
      </motion.div>
    </div>
  );
}
