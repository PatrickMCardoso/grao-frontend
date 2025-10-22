import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      tone: {
        default: '',
        soft: 'bg-muted',
      },
    },
    defaultVariants: {
      tone: 'default',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, tone, type, ...props }, ref) => {
    return (
      <input type={type} className={cn(inputVariants({ tone }), className)} ref={ref} {...props} />
    );
  },
);
Input.displayName = 'Input';

export { Input };
