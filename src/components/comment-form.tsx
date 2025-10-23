'use client';

import { useState } from 'react';

import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

type Props = {
  readonly onSubmit: (content: string) => Promise<void>;
  readonly placeholder?: string;
  readonly submitLabel?: string;
  readonly isLoading?: boolean;
};

export function CommentForm({
  onSubmit,
  placeholder = 'Escreva um comentário...',
  submitLabel = 'Comentar',
  isLoading = false,
}: Props) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    await onSubmit(content.trim());
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        tone="soft"
        className="min-h-[120px] resize-none border-0 focus-visible:ring-0"
        disabled={isLoading}
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!content.trim() || isLoading}
          className="bg-[#67A22D] text-white hover:bg-[#5a8e26]"
        >
          {isLoading ? 'Enviando...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
