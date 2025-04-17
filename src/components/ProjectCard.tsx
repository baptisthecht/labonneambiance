import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Project } from './Projects';

export function ProjectCard({ project }: { project: Project }) {
  const [hover, setHover] = useState(false);
  const ease = [0.84, 0.01, 0.51, 0.96];
  const duration = 0.5;
  const type = 'tween';
  const transition = { ease, duration, type };
  return (
    <div
      className="flex flex-col w-full gap-1 cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="bg-white rounded-[18px] gap-5 px-6 py-[18px] flex items-center">
        <div className="flex items-center gap-5 flex-1">
          <h4 className="font-semibold text-lg">{project.name}.</h4>
          <p className="font-medium text-xs text-gray-600">/{project.year}</p>
        </div>
        <div className="flex gap-1">
          <motion.div
            className="size-2 rounded-full"
            transition={transition}
            animate={{
              backgroundColor: hover ? '#f87171' : '#e5e7eb',
            }}
          />
          <motion.div
            className="size-2 rounded-full"
            transition={transition}
            animate={{
              backgroundColor: hover ? '#facc15' : '#e5e7eb',
            }}
          />
          <motion.div
            className="size-2 rounded-full"
            transition={transition}
            animate={{
              backgroundColor: hover ? '#4ade80' : '#e5e7eb',
            }}
          />
        </div>
      </div>
      <div className="bg-white rounded-[18px] gap-5 p-1 h-[540px] relative overflow-hidden">
        <motion.div
          className="w-full h-full relative"
          animate={{
            scale: hover ? 1.1 : 1,
            filter: hover ? 'blur(6px)' : 'blur(0px)',
          }}
          transition={transition}
        >
          <motion.div
            className="bg-black w-full h-full absolute z-1 rounded-2xl"
            animate={{
              opacity: hover ? 0.25 : 0.15,
            }}
            transition={transition}
          ></motion.div>
          <motion.div
            className="w-full h-full"
            animate={{
              scale: hover ? 1.02 : 1,
            }}
            transition={transition}
          >
            <Image
              src={project.img}
              width={800}
              height={500}
              alt={project.name}
              className="h-full w-full rounded-2xl object-cover"
            />
          </motion.div>
        </motion.div>
        <motion.div
          animate={{
            scale: hover ? 0.8 : 1,
          }}
          transition={transition}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
        >
          <Image
            src={project.icon}
            width={100}
            height={40}
            alt={project.name}
            className="w-48"
          />
        </motion.div>
      </div>
    </div>
  );
}
