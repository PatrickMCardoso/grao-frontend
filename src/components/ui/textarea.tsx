import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  tone?: 'default' | 'soft';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, tone = 'default', ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'border-input bg-background ring-offset-background focus-visible:ring-primary flex min-h-[120px] w-full rounded-md border px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          tone === 'soft' && 'bg-muted',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
