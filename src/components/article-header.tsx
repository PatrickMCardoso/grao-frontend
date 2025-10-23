import type { Article } from '@/services/articles';

import { ArticleMeta } from './article-meta';
import { ArticleTags } from './article-tags';

type Props = {
  readonly article: Article;
};

export function ArticleHeader({ article }: Props) {
  const estimatedReadTime = Math.ceil(article.content.length / 1000); // rough estimate

  return (
    <header className="space-y-4">
      <h1 className="text-3xl leading-tight font-bold text-neutral-900 md:text-4xl">
        {article.title}
      </h1>

      <ArticleMeta
        authorName={article.author?.username}
        updatedAt={article.updatedAt}
        readTime={estimatedReadTime.toString()}
      />

      {article.tags && <ArticleTags tags={article.tags} />}
    </header>
  );
}
