import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export function HumanCard() {
  const [hover, dispatch] = useState(false);
  const [letsChatHover, dispatchLetsChat] = useState(false);
  const ease = [0.84, 0.01, 0.51, 0.96];
  const duration = 0.5;
  const type = 'tween';
  const transition = { ease, duration, type };
  return (
    <div className="mb-40">
      <div
        className="rounded-[18px] gap-5 relative overflow-hidden w-96 h-[630px]"
        onMouseEnter={() => dispatch(true)}
        onMouseLeave={() => dispatch(false)}
      >
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
              opacity: hover ? 0.2 : 0.15,
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
              src={
                'https://framerusercontent.com/images/KL17tuoYHz5TzXCqskqaMY5Iw0.jpg'
              }
              width={800}
              height={500}
              alt={'Human'}
              className="h-full w-full rounded-2xl object-cover"
            />
          </motion.div>
        </motion.div>
        <motion.div
          animate={{
            rotateZ: hover ? 90 : 0,
          }}
          transition={transition}
          className="absolute top-5 right-5"
        >
          <p className="bg-black size-4.5 rounded-full flex items-center justify-center">
            <span className="text-white font-bold -translate-y-px">+</span>
          </p>
        </motion.div>
        <motion.div
          animate={{
            y: hover ? 0 : -36,
            opacity: hover ? 1 : 0,
          }}
          transition={transition}
          className="absolute bottom-8 left-8"
        >
          <div className="flex flex-col gap-4">
            <p className="font-medium text-white text-sm tracking-tight">
              Votre aventure digitale commence ici. <br /> Discutons-en.
            </p>
            <button
              onMouseEnter={() => dispatchLetsChat(true)}
              onMouseLeave={() => dispatchLetsChat(false)}
              className=" font-medium text-white text-xs bg-black rounded-full px-3.5 py-2.5 cursor-pointer flex justify-between w-24 items-center relative overflow-hidden"
            >
              <motion.div
                className="absolute"
                animate={{
                  y: letsChatHover ? -20 : 0,
                  opacity: letsChatHover ? 0 : 1,
                }}
                transition={{ ...transition, duration: 0.2 }}
              >
                <span>Discuter</span>
              </motion.div>
              <motion.div
                className="absolute"
                animate={{
                  y: letsChatHover ? 0 : 20,
                  opacity: letsChatHover ? 1 : 0,
                }}
                transition={{ ...transition, duration: 0.2 }}
              >
                <span>Discuter</span>
              </motion.div>
              <motion.figure
                className="bg-white rounded-full size-2 ml-auto"
                animate={{
                  scale: letsChatHover ? 1.3 : 1,
                }}
                transition={{ ...transition, duration: 0.2 }}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
