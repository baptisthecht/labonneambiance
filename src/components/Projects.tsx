import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
export type Project = {
  name: string;
  year: string;
  img: string;
  icon: string;
};
export const Projects = () => {
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [1000, 1400], [0.98, 1]);
  const grid_y = useTransform(scrollY, [800, 1200], [120, 0]);

  const projects: Project[] = [
    {
      name: 'Bolftshift',
      year: '2025',
      img: 'https://framerusercontent.com/images/TQUaM9GTresksymLH16ncQaPo.jpg',
      icon: 'https://framerusercontent.com/images/uesNBJIRG5fZ2tDJzkhxXbuauQw.svg',
    },
    {
      name: 'Ephemeral',
      year: '2025',
      img: 'https://framerusercontent.com/images/r3DvXiPExOamPrqqTNfWM1K9o4.jpg',
      icon: 'https://framerusercontent.com/images/PyQzA1IF3BF1gkVO1xuZHClY0c.svg',
    },
    {
      name: 'Powersurge',
      year: '2024',
      img: 'https://framerusercontent.com/images/UPqJOHQLdYtNuK2jee5437Lno.jpg',
      icon: 'https://framerusercontent.com/images/j2k0BUaOnC0jNyx5dP4hieQnFL4.svg',
    },
    {
      name: 'Mastermail',
      year: '2024',
      img: 'https://framerusercontent.com/images/HlvuJF9yIQ3Q8fP86EjFIq5ExE.jpg',
      icon: 'https://framerusercontent.com/images/kH7hh1Be4txgKwuTgZl3jpdZp8.svg',
    },
    {
      name: 'Warpspeed',
      year: '2023',
      img: 'https://framerusercontent.com/images/0KGHRsvK3go8kOWricmADe0VWs.jpg',
      icon: 'https://framerusercontent.com/images/JLzkuHlsyLa7VHaiV3ZJ16kiHhg.svg',
    },
    {
      name: 'CloudWatch',
      year: '2020',
      img: 'https://framerusercontent.com/images/qiCYd5j7XEmvyt9BpMldI3mNm8.jpg',
      icon: 'https://framerusercontent.com/images/zCY9SAfJ5gqVMOvrM5dzywwbU.svg',
    },
  ];
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
        <div className="grid grid-cols-2 px-40 gap-1">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </motion.div>
    </>
  );
};
