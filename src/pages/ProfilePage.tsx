import { useParams } from 'react-router';
import { usePublicProfile } from '@/api/profile';
import { ProfileHeader } from '@/components/ProfileHeader';
import { colors, space, typography } from '@/styles/tokens';

export function ProfilePage() {
  const { handle } = useParams<{ handle: string }>();
  const profile = usePublicProfile(handle);

  if (profile.isLoading) {
    return (
      <main style={center}>
        <div style={{ ...typography.body, color: colors.textSecondary }}>불러오는 중...</div>
      </main>
    );
  }

  if (profile.isError || !profile.data) {
    const code = (profile.error as { code?: string })?.code;
    const notFound = code === 'NOT_FOUND' || code === 'FARM_NOT_FOUND';
    return (
      <main style={center}>
        <h1 style={{ ...typography.header, color: colors.textPrimary, marginBottom: space.sm }}>
          {notFound ? '농가를 찾을 수 없어요' : '명함을 불러오지 못했어요'}
        </h1>
        <p style={{ ...typography.body, color: colors.textSecondary, textAlign: 'center' }}>
          {notFound
            ? `farmily.kr/@${handle} 농가는 존재하지 않거나 비공개입니다.`
            : '잠시 후 다시 시도해주세요.'}
        </p>
      </main>
    );
  }

  return (
    <main style={{ flex: 1, backgroundColor: colors.bgPage }}>
      <DomainBar handle={profile.data.handle} />
      <ProfileHeader data={profile.data} />
      <Watermark />
    </main>
  );
}

function DomainBar({ handle }: { handle: string }) {
  return (
    <div
      style={{
        padding: `${space.md}px ${space.lg}px`,
        backgroundColor: colors.surface,
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <span style={{ ...typography.caption, color: colors.textSecondary }}>
        farmily.kr/@{handle}
      </span>
    </div>
  );
}

function Watermark() {
  return (
    <div
      style={{
        padding: `${space.lg}px ${space.lg}px`,
        textAlign: 'center',
        borderTop: `1px solid ${colors.border}`,
        marginTop: space.lg,
      }}
    >
      <a
        href="/"
        style={{
          ...typography.caption,
          color: colors.primary,
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        🌱 Farmily 로 만든 농가 명함 — 가입하기 →
      </a>
    </div>
  );
}

const center: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: space.xl,
  gap: space.md,
};
