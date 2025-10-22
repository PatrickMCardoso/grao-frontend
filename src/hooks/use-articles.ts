import { keepPreviousData, useQuery, type UseQueryResult } from '@tanstack/react-query';

import { api } from '@/services/api';
import type { Article } from '@/services/articles';

export type ArticlesResponse = {
  items: Article[];
  total: number;
  page: number;
  limit: number;
};

export function useArticles(params: {
  page: number;
  limit: number;
  search?: string;
  tag?: string;
}): UseQueryResult<ArticlesResponse, Error> {
  return useQuery<ArticlesResponse, Error>({
    queryKey: ['articles', params],
    queryFn: async () => {
      const res = await api.get('/articles', { params });
      return res.data as ArticlesResponse;
    },
    placeholderData: keepPreviousData,
  });
}
