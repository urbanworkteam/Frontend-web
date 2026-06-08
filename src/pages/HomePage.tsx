import { colors, radius, space, typography } from '@/styles/tokens';

export function HomePage() {
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
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: radius.lg,
          backgroundColor: '#E6F4EA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
        }}
      >
        🌿
      </div>
      <h1 style={{ ...typography.header, fontSize: 32, margin: 0, color: colors.textPrimary }}>
        Farmily
      </h1>
      <p
        style={{
          ...typography.body,
          color: colors.textSecondary,
          textAlign: 'center',
          marginTop: 0,
          lineHeight: 1.6,
        }}
      >
        농민의 이야기를
        <br />
        소비자와 연결합니다
      </p>
      <p
        style={{
          ...typography.caption,
          color: colors.textTertiary,
          marginTop: space.xl,
          textAlign: 'center',
        }}
      >
        농가 명함 URL: farmily.info/@&lt;농장명&gt;
      </p>
    </main>
  );
}
