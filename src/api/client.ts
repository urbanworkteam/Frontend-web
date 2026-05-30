import axios from 'axios';

const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

export const api = axios.create({
  baseURL: apiBase,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: { code: string; message: string; field?: string | null } | null;
};

// public endpoint 는 인증 불필요. 응답 unwrap.
export async function unwrap<T>(promise: Promise<{ data: ApiResponse<T> }>): Promise<T> {
  const { data } = await promise;
  if (!data.success || data.data === undefined) {
    const e = data.error;
    throw Object.assign(new Error(e?.message ?? '알 수 없는 오류'), {
      code: e?.code ?? 'UNKNOWN',
    });
  }
  return data.data;
}
