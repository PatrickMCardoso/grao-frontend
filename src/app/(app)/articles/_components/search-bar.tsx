'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onPageReset: () => void;
};

export function SearchBar({ value, onChange, onPageReset }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900">Todos os artigos</h1>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/articles/create">Criar artigo</Link>
        </Button>
      </div>
      <Input
        tone="soft"
        placeholder="Pesquisar..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          onPageReset();
        }}
        className="border-0 focus-visible:ring-0"
        aria-label="Pesquisar artigos"
      />
    </div>
  );
}
