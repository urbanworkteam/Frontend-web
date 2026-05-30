import { useQuery } from '@tanstack/react-query';
import { api, unwrap, type ApiResponse } from './client';
import type { PublicProfileResponse } from '@/types/profile';

export function usePublicProfile(handle: string | undefined) {
  return useQuery({
    queryKey: ['public-profile', handle],
    enabled: !!handle,
    queryFn: async () => {
      const res = await api.get<ApiResponse<PublicProfileResponse>>(
        `/api/v1/public/farms/${handle}`,
      );
      return unwrap(Promise.resolve(res));
    },
    retry: (failureCount, error) => {
      // handle 없으면(404 / NOT_FOUND) 더 시도 안 함
      const code = (error as { code?: string })?.code;
      if (code === 'NOT_FOUND' || code === 'FARM_NOT_FOUND') return false;
      return failureCount < 1;
    },
  });
}
