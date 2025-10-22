import './globals.css';

import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';

import { SiteHeader } from '@/components/site-header';

import { Providers } from './providers';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TechBlog',
  description: 'Plataforma interna de artigos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={newsreader.variable}>
      <body className="min-h-screen bg-white font-serif text-neutral-900 antialiased">
        <Providers>
          <SiteHeader />
          <main className="container mx-auto px-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
