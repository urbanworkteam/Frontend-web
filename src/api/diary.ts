import { useQuery } from '@tanstack/react-query';
import { api, unwrap, type ApiResponse } from './client';
import type { CalendarMonth, DiaryPublic } from '@/types/profile';

export function usePublicCalendar(handle: string | undefined, year: number, month: number) {
  return useQuery({
    queryKey: ['public-calendar', handle, year, month],
    enabled: !!handle,
    queryFn: async () => {
      const res = await api.get<ApiResponse<CalendarMonth>>(
        `/api/v1/public/farms/${handle}/calendar`,
        { params: { year, month } },
      );
      return unwrap(Promise.resolve(res));
    },
  });
}

export function usePublicDiariesByDate(handle: string | undefined, date: string, enabled: boolean) {
  return useQuery({
    queryKey: ['public-diaries-by-date', handle, date],
    enabled: enabled && !!handle,
    queryFn: async () => {
      const res = await api.get<ApiResponse<DiaryPublic[]>>(
        `/api/v1/public/farms/${handle}/calendar/${date}`,
      );
      return unwrap(Promise.resolve(res));
    },
  });
}
