import './globals.css';

import type { Metadata } from 'next';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'TechBlog',
  description: 'Plataforma interna de artigos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <Providers>
          <main className="container mx-auto px-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
