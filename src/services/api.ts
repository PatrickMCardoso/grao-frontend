import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api/v1',
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const win = typeof globalThis !== 'undefined' ? globalThis.window : undefined;
  if (win) {
    const userId = win.localStorage.getItem('auth.userId');
    if (userId) {
      const headers = AxiosHeaders.from(config.headers);
      headers.set('X-User-Id', userId);
      config.headers = headers;
    }
  }
  return config;
});
