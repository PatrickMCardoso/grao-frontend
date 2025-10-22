import { api } from "./api";

export type Article = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags?: { id: number; name: string }[];
};

export async function listArticles(params: {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
}) {
  const res = await api.get("/articles", { params });
  return res.data as {
    total: number;
    page: number;
    limit: number;
    items: Article[];
  };
}

export async function getArticle(id: number) {
  const res = await api.get(`/articles/${id}`);
  return res.data as Article;
}
