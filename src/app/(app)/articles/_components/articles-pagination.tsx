'use client';

import { cn } from '@/lib/utils';

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  windowSize?: number;
};

export function ArticlesPagination({ page, totalPages, onChange, windowSize = 5 }: Props) {
  const pages = (() => {
    const max = Math.max(1, windowSize);
    let start = Math.max(1, page - Math.floor(max / 2));
    const end = Math.min(totalPages, start + max - 1);
    if (end - start + 1 < max) start = Math.max(1, end - max + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  })();

  const handlePageChange = (newPage: number) => {
    onChange(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-4 pt-2" aria-label="Paginação">
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => handlePageChange(p)}
          className={cn(
            'h-8 w-8 rounded-full text-sm transition-colors',
            p === page ? 'bg-muted font-semibold' : 'text-neutral-800 hover:text-neutral-950',
          )}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
    </nav>
  );
}
