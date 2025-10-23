import { useQuery } from '@tanstack/react-query';

import { type Article, getArticleById } from '@/services/articles';

export function useArticle(id: string | number) {
  return useQuery<Article, Error>({
    queryKey: ['article', id],
    queryFn: () => getArticleById(id),
    enabled: !!id,
  });
}
