import { ArticleListItem } from '@/components/article-list-item';
import type { Article } from '@/services/articles';

type Props = {
  articles?: Article[];
  isLoading: boolean;
};

export function ArticlesList({ articles, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={`skeleton-${i}`} className="bg-muted/70 h-16 animate-pulse rounded-md" />
        ))}
      </div>
    );
  }

  if (!articles?.length) {
    return <div className="py-8 text-center text-neutral-500">Nenhum artigo encontrado</div>;
  }

  return (
    <div className="space-y-3">
      {articles.map((article) => (
        <ArticleListItem key={article.id} article={article} />
      ))}
    </div>
  );
}
