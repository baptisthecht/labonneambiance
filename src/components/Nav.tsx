import { motion } from 'framer-motion';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const Nav = () => {
  return (
    <motion.div
      className={
        'fixed w-full bg-silver z-50 flex items-center justify-between p-1 pt-1.5 px-8 font-semibold  ' +
        poppins.className
      }
    >
      <h1>La bonne ambiance*</h1>
      <NavLink label="L'agence" path="/agency" />{' '}
      <NavLink label="Clients" path="/clients" />{' '}
      <NavLink label="À propos" path="/about" />
      <h1>=</h1>
    </motion.div>
  );
};

export const NavLink = ({ label, path }: { label: string; path: string }) => (
  <Link href={path} className="p-2">
    {label}
  </Link>
);
