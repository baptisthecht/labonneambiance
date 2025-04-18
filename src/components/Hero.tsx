import { OmbrePearl7 } from '@ombre-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import GlassmorphismCard from './GlassCard';

export const Hero = () => {
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [0, 1000], [1, 0.9]);

  return (
    <motion.div
      style={{
        scale,
      }}
      initial={{ y: 40 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.25, 1.19, 0.92, 0.96] }}
      className="flex justify-between mt-14 gap-6 p-6 flex-1 bg-slate-900 m-1.5 rounded-3xl relative overflow-hidden min-h-[calc(100dvh-68px)] z-20"
    >
      <OmbrePearl7 />
      <div className="flex flex-col justify-between">
        <GlassmorphismCard className="p-10 h-auto w-min">
          <Sparkle className="text-white size-4" />
        </GlassmorphismCard>
        <p className="text-center z-1 font-medium text-[22px] p-10 mt-auto text-white tracking-tighter">
          Une relation saine. Une expérience <br /> utile.{' '}
          <span className="opacity-70">
            Trouver le sixième sens de la marque pour <br /> faire émerger votre
            supplément d&apos;âme.
          </span>
        </p>
      </div>
      <p className="text-end z-1 font-bold text-[120px] leading-32 p-10 mt-auto text-white tracking-tighter">
        la <br /> bonne <br /> ambiance.
      </p>
    </motion.div>
  );
};
