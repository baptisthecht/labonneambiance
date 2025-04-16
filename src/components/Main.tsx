import { motion, useScroll, useTransform } from 'framer-motion';
import { Poppins } from 'next/font/google';
import { Hero } from './Hero';
import { Nav } from './Nav';
import { Projects } from './Projects';
const poppins = Poppins({ weight: '700', subsets: ['latin'] });
export const Main = () => {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 600], [-300, 0]);
  const containerScale = useTransform(scrollY, [0, 600], [0.95, 1]);
  return (
    <>
      <Nav />
      <Hero />
      <div className="h-20"></div>
      <motion.div style={{ y, scale: containerScale }}>
        <p className={'ml-20 py-8 ' + poppins.className}>Nos clients</p>
        <div className="px-20 grid grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div className="bg-white p-8 rounded-xl h-40" key={i}>
              test
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="h-40"></div>
      <Projects />
    </>
  );
};
