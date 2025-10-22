import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listArticles } from "@/services/articles";

export function useArticles(params: {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
}) {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => listArticles(params),
    placeholderData: keepPreviousData,
  });
}
