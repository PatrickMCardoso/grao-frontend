import { useQuery } from '@tanstack/react-query';

import { formatTag } from '@/lib/format-tag';
import { api } from '@/services/api';

export function useAllTags() {
  return useQuery({
    queryKey: ['all-tags'],
    queryFn: async () => {
      const res = await api.get('/tags');
      const raw = res.data as string[];

      const formatted = raw.map(formatTag);

      return Array.from(new Set(formatted)).sort((a, b) => a.localeCompare(b));
    },
  });
}
