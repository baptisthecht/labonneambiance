import { OmbrePearl7 } from "@ombre-ui/react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });
export const Main = () => {
  return (
    <>
      <motion.div className="flex items-center justify-between p-3 mt-1.5 rounded-4xl px-8">
        <h1 className={"font-semibold " + poppins.className}>La bonne ambiance*</h1>
        <h1 className={"font-semibold " + poppins.className}>L&apos;agence</h1>
        <h1 className={"font-semibold " + poppins.className}>Clients</h1>
        <h1 className={"font-semibold " + poppins.className}>À propos</h1>=
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: [0, 0.9, 0.8, 1],
        }}
        className="flex flex-col items-start  gap-6 p-6 flex-1 bg-slate-900 m-1.5 rounded-xl relative overflow-hidden">
        <OmbrePearl7 />
        <div className="flex flex-col items-end w-min">
          <h1 className={"text-[61px] leading-none font-bold text-white z-1 mr-auto " + poppins.className}>La</h1>
          <h1 className={"text-[256px] leading-none font-bold text-white z-1 pl-10 " + poppins.className}>bonne</h1>
          <h1 className={"text-[128px] leading-none font-bold text-white z-1 -mr-24 " + poppins.className}>ambiance*</h1> 
        </div>
        <p className="text-center z-1 font-medium text-[22px] p-10 mt-auto text-white tracking-tighter">
          Une relation saine. Une expérience
          <br /> utile. <span className="opacity-70">Trouver le sixième sens de la marque pour <br />faire émerger votre supplément d'âme.</span>
        </p>
      </motion.div>
    </>
  );
};
