'use client';
import { motion } from 'framer-motion';
import TransitionLink from './TransitionLink';

export const Nav = () => {
  return (
    <motion.div
      className={
        'fixed w-full bg-silver z-50 flex items-center justify-between py-1.5 px-8 font-semibold font-poppins'
      }
    >
      <NavLink label="La bonne ambiance*" path="/" />
      <NavLink label="L'agence" path="/agency" />
      <NavLink label="Clients" path="/clients" />
      <NavLink label="À propos" path="/about" />
      <h1>=</h1>
    </motion.div>
  );
};

export const NavLink = ({ label, path }: { label: string; path: string }) => (
  <TransitionLink href={path} className="p-2">
    {label}
  </TransitionLink>
);
