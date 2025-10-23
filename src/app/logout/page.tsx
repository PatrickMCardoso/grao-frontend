'use client';

import { useEffect } from 'react';

import { useAuth } from '@/contexts/auth';

export default function LogoutPage() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-neutral-600">Fazendo logout...</p>
    </div>
  );
}
