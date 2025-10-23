import { api } from './api';

export type Article = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags?: { id: number; name: string }[];
  author?: { id: number; username: string; email: string };
};

export async function listArticles(params: {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
}) {
  const res = await api.get('/articles', { params });
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

export async function getArticleById(id: string | number) {
  const res = await api.get(`/articles/${id}`);
  return res.data as Article;
}

export type UpdateArticleData = {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
};

export async function updateArticle(data: UpdateArticleData): Promise<Article> {
  const { id, ...updateData } = data;
  const res = await api.put(`/articles/${id}`, updateData);
  return res.data as Article;
}
