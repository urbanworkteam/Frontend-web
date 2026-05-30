// 모바일 앱(src/ui/tokens.ts) 과 동일한 디자인 토큰. 자주 바뀌면 npm 패키지로 추출 고려.

export const colors = {
  primary: '#2BA651',
  primaryDim: '#A8D5B0',
  primaryDark: '#1F7D3D',
  bgPage: '#FAFAFA',
  surface: '#FFFFFF',
  surfaceMuted: '#F3F4F6',
  border: '#E5E7EB',
  borderStrong: '#D1D5DB',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  danger: '#EF4444',
  dangerBg: '#FEF2F2',
  warning: '#F59E0B',
  success: '#10B981',
  info: '#3B82F6',
  overlay: 'rgba(0,0,0,0.5)',
} as const;

export const radius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 9999,
} as const;

export const space = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const typography = {
  header: { fontSize: 20, fontWeight: 600, lineHeight: 1.4 },
  title: { fontSize: 16, fontWeight: 600, lineHeight: 1.4 },
  body: { fontSize: 14, fontWeight: 400, lineHeight: 1.43 },
  bodyBold: { fontSize: 14, fontWeight: 600, lineHeight: 1.43 },
  caption: { fontSize: 12, fontWeight: 400, lineHeight: 1.33 },
  small: { fontSize: 11, fontWeight: 400, lineHeight: 1.27 },
} as const;
