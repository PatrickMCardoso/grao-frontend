'use client';

import { useRouter } from 'next/navigation';
import { type ReactNode,useEffect } from 'react';

import { useAuth } from '@/contexts/auth';

interface ProtectedRouteProps {
  readonly children: ReactNode;
  readonly fallbackUrl?: string;
}

export function ProtectedRoute({ children, fallbackUrl = '/login' }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(fallbackUrl);
    }
  }, [user, loading, router, fallbackUrl]);

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

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
