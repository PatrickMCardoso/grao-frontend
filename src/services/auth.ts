import { api } from './api';

export type AuthUser = { id: number; username: string; email: string };

export async function signIn(email: string, password: string) {
  const res = await api.post<{ userId: number; user: AuthUser }>('/auth/login', {
    email,
    password,
  });
  return res.data;
}

export async function fetchMe() {
  const res = await api.get<AuthUser>('/auth/me');
  return res.data;
}
