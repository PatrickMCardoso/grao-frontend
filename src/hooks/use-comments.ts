import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '../services/api';

type Comment = {
  id: number;
  content: string;
  authorId: number;
  createdAt: string;
  parentId: number | null;
  replies: Comment[];
  author?: {
    id: number;
    username: string;
    email: string;
  };
};

type CreateCommentData = {
  content: string;
  parentId?: number;
};

export function useComments(articleId: number) {
  return useQuery({
    queryKey: ['comments', articleId],
    queryFn: async (): Promise<Comment[]> => {
      const { data } = await api.get(`/articles/${articleId}/comments`);
      return data;
    },
  });
}

export function useCreateComment(articleId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentData: CreateCommentData): Promise<Comment> => {
      const { data } = await api.post(`/articles/${articleId}/comments`, commentData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    },
  });
}

export function useDeleteComment(articleId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: number): Promise<void> => {
      await api.delete(`/articles/${articleId}/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
    },
  });
}
