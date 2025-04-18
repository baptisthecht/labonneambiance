import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export function Results() {
  const ease = [0.84, 0.01, 0.51, 0.96];
  const duration = 0.5;
  const type = 'tween';
  const transition = { ease, duration, type };
  const [hoverProjects, setHoverProjects] = useState(false);
  const [hoverRate, setHoverRate] = useState(false);

  return (
    <div className="flex flex-col gap-10 w-full h-[630px] justify-between">
      <p className="text-[22px] font-medium text-light-black tracking-tighter max-w-lg leading-7">
        <span className="ml-24">Pas de blabla, que des résultats. </span>
        <span className="opacity-60">
          Un design réfléchi et des outils qui facilitent votre travail. Nous
          misons sur un design intelligent et des fonctionnalités utiles, projet
          après projet.
        </span>
      </p>
      <div className="flex gap-1">
        <motion.div
          className="w-full flex flex-col"
          onMouseEnter={() => setHoverProjects(true)}
          onMouseLeave={() => setHoverProjects(false)}
          animate={{
            gap: hoverProjects ? '0' : '4px',
          }}
          transition={transition}
        >
          <motion.div
            className="bg-white p-8 flex justify-between"
            animate={{
              borderTopRightRadius: '16px',
              borderTopLeftRadius: '16px',
              borderBottomLeftRadius: hoverProjects ? '0px' : '16px',
              borderBottomRightRadius: hoverProjects ? '0px' : '16px',
            }}
            transition={transition}
          >
            <span className=" text-5xl font-semibold tracking-tighter">
              50+
            </span>
            <span className="opacity-60 text-[10px]">01</span>
          </motion.div>
          <motion.div
            className="bg-white p-8 flex flex-col justify-between"
            animate={{
              height: hoverProjects ? 300 : 296,
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
              borderTopRightRadius: hoverProjects ? '0px' : '16px',
              borderTopLeftRadius: hoverProjects ? '0px' : '16px',
            }}
            transition={transition}
          >
            <p className="text-end font-medium text-lg tracking-tight leading-6 ml-auto">
              Projets terminés <br /> avec succès
            </p>
            <p className="font-medium tracking-tight leading-6 opacity-60">
              We’ve delivered 50+ projects that help companies generate real
              results.
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="w-full flex flex-col"
          onMouseEnter={() => setHoverRate(true)}
          onMouseLeave={() => setHoverRate(false)}
          animate={{
            gap: hoverRate ? '0' : '4px',
          }}
          transition={transition}
        >
          <motion.div
            className="bg-white p-8 flex justify-between"
            animate={{
              borderTopRightRadius: '16px',
              borderTopLeftRadius: '16px',
              borderBottomLeftRadius: hoverRate ? '0px' : '16px',
              borderBottomRightRadius: hoverRate ? '0px' : '16px',
            }}
            transition={transition}
          >
            <span className=" text-5xl font-semibold tracking-tighter">
              95 %
            </span>
            <span className="opacity-60 text-[10px]">02</span>
          </motion.div>
          <motion.div
            className="bg-white p-8 flex flex-col justify-between"
            animate={{
              height: hoverRate ? 300 : 296,
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
              borderTopRightRadius: hoverRate ? '0px' : '16px',
              borderTopLeftRadius: hoverRate ? '0px' : '16px',
            }}
            transition={transition}
          >
            <p className="text-end font-medium text-lg tracking-tight leading-6 ml-auto">
              Taux de <br />
              satisfaction client
            </p>
            <div className="flex justify-between">
              <Image
                src={
                  'https://framerusercontent.com/images/wk98ext8C9l414fS0PK6BvjTA.svg'
                }
                width={100}
                height={40}
                alt={'icon'}
                className="object-contain"
              />
              <Image
                src={
                  'https://framerusercontent.com/images/m9cv2Bx2sImOjy4Q3x1Fk5d5WGM.svg'
                }
                width={100}
                height={40}
                alt={'icon'}
                className="object-contain"
              />
              <Image
                src={
                  'https://framerusercontent.com/images/CtaV2dn3ujpK8zv0Py3i9IJArPQ.svg'
                }
                width={100}
                height={40}
                alt={'icon'}
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
