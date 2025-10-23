import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

import type { Article } from '@/services/articles';

import { ArticleMeta } from './article-meta';
import { ArticleTags } from './article-tags';

type Props = {
  readonly article: Article;
  readonly currentUserId?: number;
  readonly onDelete?: () => void;
};

export function ArticleHeader({ article, currentUserId, onDelete }: Props) {
  const estimatedReadTime = Math.ceil(article.content.length / 1000);
  const isAuthor = currentUserId === article.authorId;

  return (
    <header className="space-y-4">
      {/* Título */}
      <div className="space-y-3">
        <h1 className="text-3xl leading-tight font-bold text-neutral-900 md:text-4xl">
          {article.title}
        </h1>

        {/* Botões do autor - sempre embaixo do título, alinhados à esquerda */}
        {isAuthor && (
          <div className="flex gap-2">
            <Link
              href={`/articles/${article.id}/edit`}
              className="bg-muted inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-neutral-700 transition-all hover:bg-neutral-200 hover:text-neutral-900"
            >
              <Edit className="h-4 w-4" />
              <span>Editar</span>
            </Link>
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-sm text-red-700 transition-all hover:bg-red-100 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
              <span>Excluir</span>
            </button>
          </div>
        )}
      </div>

      {/* Meta */}
      <ArticleMeta
        authorName={article.author?.username}
        updatedAt={article.updatedAt}
        readTime={estimatedReadTime.toString()}
      />

      {/* Tags */}
      {article.tags && <ArticleTags tags={article.tags} />}
    </header>
  );
}
