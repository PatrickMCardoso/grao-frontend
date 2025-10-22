import { cn } from '@/lib/utils';

type Props = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function TagPill({ label, active, onClick, className }: Readonly<Props>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-3 py-1 text-xs transition-colors',
        active ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80 text-neutral-700',
        className,
      )}
    >
      {label}
    </button>
  );
}
