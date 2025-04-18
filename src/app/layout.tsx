import BrowserNavigationHandler from '@/components/BrowserNavigationHandler';
import { TransitionProvider } from '@/components/TransitionSystem';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <TransitionProvider>
          {children}
          <BrowserNavigationHandler />
        </TransitionProvider>
      </body>
    </html>
  );
}
