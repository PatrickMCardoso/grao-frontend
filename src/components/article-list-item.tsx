import { Edit2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { TagPill } from '@/components/tag-pill';
import { useAuth } from '@/contexts/auth';
import { formatTag } from '@/lib/format-tag';
import type { Article } from '@/services/articles';

export function ArticleListItem({ article }: { readonly article: Article }) {
  const { user } = useAuth();
  const excerpt =
    article.content.length > 100 ? article.content.slice(0, 100) + '…' : article.content;

  const tagName = article.tags?.[0]?.name;
  const formattedTag = tagName ? formatTag(tagName) : undefined;

  return (
    <div className="flex gap-3 py-3">
      <Image
        src="/images/noimage.png"
        alt="Article thumbnail"
        width={56}
        height={56}
        className="shrink-0 rounded-lg object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <Link
            href={`/articles/${article.id}`}
            className="min-w-0 flex-1 truncate text-base text-neutral-900 hover:underline"
          >
            {article.title}
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            {formattedTag && (
              <TagPill label={formattedTag} className="px-2 py-0.5 text-xs font-bold" />
            )}
            {user && user.id === article.authorId && (
              <Link
                href={`/articles/${article.id}/edit`}
                className="rounded-full p-1 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
                title="Editar artigo"
              >
                <Edit2 className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
        <p className="line-clamp-2 text-xs text-neutral-500">{excerpt}</p>
      </div>
    </div>
  );
}
