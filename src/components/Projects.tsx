import { motion, useScroll, useTransform } from 'framer-motion';

export const Projects = () => {
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [1000, 1400], [0.98, 1]);
  const grid_y = useTransform(scrollY, [1000, 1400], [80, 0]);
  return (
    <>
      <div className="p-20 flex justify-between items-center">
        <p className="text-gray-500">(27)</p>
        <div>
          <p className="text-[144px] font-semibold tracking-tighter text-black">
            Projets.
          </p>
          <p className="text-4xl font-semibold -mt-6">©2025</p>
        </div>
        <p className="text-gray-500 font-medium max-w-xs">
          We’ve helped businesses across industries achieve their goals. Here
          are some of our recent projects.
        </p>
      </div>
      <div className="h-20"></div>
      <motion.div style={{ y: grid_y, scale }}>
        <div className="grid grid-cols-2 px-20 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div className="bg-white p-8 rounded-xl h-96" key={i}>
              test
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};
