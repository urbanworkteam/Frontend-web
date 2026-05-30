import { Link } from 'react-router';
import { colors, space, typography } from '@/styles/tokens';

export function NotFoundPage() {
  return (
    <main
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: space.xl,
        gap: space.md,
      }}
    >
      <h1 style={{ ...typography.header, color: colors.textPrimary }}>페이지를 찾을 수 없어요</h1>
      <Link to="/" style={{ ...typography.body, color: colors.primary }}>
        ← 홈으로
      </Link>
    </main>
  );
}
