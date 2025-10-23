'use client';

import { useState } from 'react';

import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth';

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return setErr('Informe um email válido.');
    if (!password) return setErr('Informe a senha.');

    try {
      setSubmitting(true);
      await signIn(email, password);
    } catch {
      setErr('Credenciais inválidas.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <SiteHeader variant="title" />
      <main className="flex flex-1 items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="mt-12 w-full max-w-lg space-y-4" noValidate>
          <h1 className="login-title mb-4 text-center font-semibold text-neutral-900">
            Bem-vindo de volta
          </h1>

          <label className="block text-base text-neutral-800">
            Email
            <Input
              tone="soft"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 border-0 placeholder:text-neutral-400 focus-visible:ring-0"
            />
          </label>

          <label className="block text-base text-neutral-800">
            Senha
            <Input
              tone="soft"
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 border-0 placeholder:text-neutral-400 focus-visible:ring-0"
            />
          </label>

          {err ? <p className="text-sm text-red-600">{err}</p> : null}

          <Button
            type="submit"
            disabled={submitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 w-full cursor-pointer"
          >
            {submitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </main>
    </div>
  );
}
