import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-serif text-lg font-semibold">
          TechBlog
        </Link>
        <Button variant="link" className="text-primary text-sm font-semibold">
          Entrar
        </Button>
      </div>
    </header>
  );
}
