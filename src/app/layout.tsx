import { PageTransitionProvider } from '@/components/PageTransitionSystem';
import { cn } from '@/lib/utils/cn';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});
export const metadata = {
  title: 'La bonne ambiance*',
  description: 'Super transition',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={cn('bg-silver', inter.className, poppins.variable)}>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
