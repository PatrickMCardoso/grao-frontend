'use client';

import Link from 'next/link';

import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <SiteHeader variant="enter" />
      <main className="flex flex-1 items-center justify-center px-4">
        <section className="w-full max-w-5xl text-center">
          <h1 className="landing-title font-semibold text-neutral-900">Insights &amp; Learning</h1>
          <p className="landing-subtitle mt-5 px-10 text-neutral-600">
            Explorando tendências Tech, um post por vez
          </p>

          <div className="mt-5">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold"
            >
              <Link href="/login">Começar a ler</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
