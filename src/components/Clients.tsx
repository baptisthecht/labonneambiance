import { projects } from '@/lib/utils/vars';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export function Clients() {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 600], [-300, 0]);
  const containerScale = useTransform(scrollY, [0, 600], [0.95, 1]);
  return (
    <motion.div style={{ y, scale: containerScale }} className="px-40 mb-20">
      <div className="flex gap-2 py-16 items-center">
        <p className="bg-black size-4.5 rounded-full flex items-center justify-center">
          <span className="text-white font-bold -translate-y-px">+</span>
        </p>
        <p>Nos clients</p>
        <p className="ml-64">
          (2016-{new Date().getFullYear().toString().slice(2, 4)}©)
        </p>
      </div>
      <div className=" grid grid-cols-6 gap-1">
        {projects.map((brand, i) => (
          <motion.div
            className="bg-white p-8 rounded-xl h-44 flex items-center justify-center font-poppins font-bold text-xl"
            key={i}
          >
            <Image
              src={brand.icon}
              width={100}
              height={40}
              alt={brand.name}
              className="w-48 p-8 fill-black"
              style={{ filter: 'invert(1)' }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
