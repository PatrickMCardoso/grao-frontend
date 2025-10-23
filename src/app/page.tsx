'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/articles');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-600"></div>
          <p className="mt-2 text-sm text-neutral-600">Carregando...</p>
        </div>
      </div>
    );
  }

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
