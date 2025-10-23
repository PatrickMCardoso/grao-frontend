'use client';

import { cn } from '@/lib/utils';

type Props = {
  tags: string[];
  active?: string;
  onToggle: (tag?: string) => void;
  itemClassName?: string;
};

export function TagScroller({ tags, active, onToggle, itemClassName }: Props) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center gap-2 py-1">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onToggle(active === t ? undefined : t)}
            className={cn(
              'bg-muted rounded-xl px-3 py-1 text-xs transition-colors',
              active === t
                ? 'bg-primary text-primary-foreground'
                : 'text-neutral-700 hover:text-neutral-900',
              itemClassName,
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
