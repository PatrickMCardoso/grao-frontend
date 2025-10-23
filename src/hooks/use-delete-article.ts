import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/services/api';

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (articleId: number) => {
      await api.delete(`/articles/${articleId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}
