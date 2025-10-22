import { LogOut } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

type SiteHeaderProps = {
  variant?: 'enter' | 'title' | 'logout';
  signInHref?: string;
  signOutHref?: string;
  className?: string;
};

export function SiteHeader({
  variant = 'title',
  signInHref = '/login',
  signOutHref = '/logout',
  className,
}: SiteHeaderProps) {
  return (
    <header className={cn('relative', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -mx-4 h-px bg-neutral-200"
      />
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link href="/" className="font-serif text-lg font-semibold">
          TechBlog
        </Link>

        {variant === 'enter' && (
          <Link href={signInHref} className="text-primary text-sm font-semibold">
            Entrar
          </Link>
        )}

        {variant === 'logout' && (
          <Link
            href={signOutHref}
            className="bg-muted hover:bg-muted/80 inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-sm font-semibold text-neutral-800"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        )}
      </div>
    </header>
  );
}
