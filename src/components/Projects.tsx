import { projects } from '@/lib/utils/vars';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectCard } from './ProjectCard';

export const Projects = () => {
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [1000, 1400], [0.98, 1]);
  const grid_y = useTransform(scrollY, [80, 1400], [120, 0]);
  return (
    <>
      <div className="mx-40 my-20 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-500">(27)</p>
        <div>
          <p className="text-[144px] font-semibold tracking-tighter text-black">
            Projets.
          </p>
          <p className="text-4xl font-semibold -mt-6">©2025</p>
        </div>
        <p className="text-light-gray opacity-60 font-medium max-w-80 tracking-tighter">
          Nous avons aidé des entreprises de divers secteurs à atteindre leurs
          objectifs. Voici quelques-uns de nos projets récents.
        </p>
      </div>
      <div className="h-20"></div>
      <motion.div style={{ y: grid_y, scale }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 px-4 sm:px-40 gap-1">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </motion.div>
    </>
  );
};
