import { useParams } from 'react-router';
import { colors, space, typography } from '@/styles/tokens';

export function ProfilePage() {
  const { handle } = useParams<{ handle: string }>();
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
      <h1 style={{ ...typography.header, color: colors.textPrimary }}>@{handle}</h1>
      <p style={{ ...typography.body, color: colors.textSecondary }}>
        명함 페이지 — 다음 PR 에서 구현 (헤더 / 판매처 / 달력 / 일지 카드 / 사진)
      </p>
    </main>
  );
}
