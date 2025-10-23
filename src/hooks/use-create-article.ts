import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '../services/api';

type CreateArticleData = {
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
};

type Article = {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  tags: { id: number; name: string }[];
  author: {
    id: number;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (articleData: CreateArticleData): Promise<Article> => {
      const { data } = await api.post('/articles', articleData);
      return data;
    },
    onSuccess: () => {
      // Invalida a cache da lista de artigos para refrescar
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}
