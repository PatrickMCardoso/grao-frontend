'use client';

import { useMemo, useState } from 'react';

import { useArticles } from '@/hooks/use-articles';

export function useArticlesFilters() {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const limit = 6;

  const params = useMemo(() => ({ page, limit, search, tag }), [page, limit, search, tag]);
  const { data, isLoading } = useArticles(params);

  return {
    search,
    tag,
    page,
    setSearch,
    setTag,
    setPage,
    data,
    isLoading,
  };
}
