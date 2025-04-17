import { motion, useScroll, useTransform } from 'framer-motion';
import { Hero } from './Hero';
import { Nav } from './Nav';
import { Projects } from './Projects';
export const Main = () => {
  const { scrollY } = useScroll();

  const brands = ['Nike', 'Adidas', 'Levis', 'Apple', 'Coca cola', 'Carrhart'];

  const y = useTransform(scrollY, [0, 600], [-300, 0]);
  const containerScale = useTransform(scrollY, [0, 600], [0.95, 1]);
  return (
    <>
      <Nav />
      <Hero />
      <motion.div style={{ y, scale: containerScale }} className="px-40">
        <div className="flex gap-2 py-16 items-center">
          <p className="bg-black size-4.5 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">+</span>
          </p>
          <p>Nos clients</p>
          <p className="ml-64">
            (2016-{new Date().getFullYear().toString().slice(2, 4)}©)
          </p>
        </div>
        <div className=" grid grid-cols-6 gap-1">
          {brands.map((brand, i) => (
            <motion.div
              className="bg-white p-8 rounded-xl h-44 flex items-center justify-center font-poppins font-bold text-xl"
              key={i}
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="h-40"></div>
      <Projects />
    </>
  );
};
