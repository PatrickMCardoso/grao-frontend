import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type Article, updateArticle, type UpdateArticleData } from '@/services/articles';

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation<Article, Error, UpdateArticleData>({
    mutationFn: updateArticle,
    onSuccess: (updatedArticle) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });

      queryClient.invalidateQueries({ queryKey: ['article', updatedArticle.id] });

      queryClient.setQueryData(['article', updatedArticle.id], updatedArticle);
    },
  });
}
