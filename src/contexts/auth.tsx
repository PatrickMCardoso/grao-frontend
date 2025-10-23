'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { type AuthUser, fetchMe, signIn as apiSignIn } from '@/services/auth';

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function hydrate() {
      try {
        const storedUser = localStorage.getItem('auth.user');
        if (storedUser) setUser(JSON.parse(storedUser));
        const id = localStorage.getItem('auth.userId');
        if (id) {
          const me = await fetchMe().catch(() => null);
          if (me) {
            setUser(me);
            localStorage.setItem('auth.user', JSON.stringify(me));
          }
        }
      } finally {
        setLoading(false);
      }
    }
    hydrate();
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      signIn: async (email, password) => {
        const { userId, user } = await apiSignIn(email, password);
        localStorage.setItem('auth.userId', String(userId));
        localStorage.setItem('auth.user', JSON.stringify(user));
        setCookie('auth.userId', String(userId));
        setUser(user);
        router.push('/articles');
      },
      signOut: () => {
        localStorage.removeItem('auth.userId');
        localStorage.removeItem('auth.user');
        deleteCookie('auth.userId');
        setUser(null);
        router.push('/login');
      },
    }),
    [user, loading, router],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
