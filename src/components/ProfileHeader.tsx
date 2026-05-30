import type { PublicProfileResponse, SalesChannelCode } from '@/types/profile';
import { colors, radius, space, typography } from '@/styles/tokens';

const CHANNEL_META: Record<SalesChannelCode, { icon: string; label: string }> = {
  SMARTSTORE: { icon: '🛒', label: '스마트스토어' },
  INSTAGRAM: { icon: '📸', label: '인스타그램' },
  DAANGN: { icon: '🥕', label: '당근' },
};

export function ProfileHeader({ data }: { data: PublicProfileResponse }) {
  const farmName = data.farm.farmName ?? '농장명 미설정';
  const initial = farmName.charAt(0);
  const meta = [data.farm.region, data.farm.farmingMethod].filter(Boolean).join(' · ');

  return (
    <section>
      {/* 배경 사진 영역 */}
      <div
        style={{
          height: 160,
          backgroundColor: '#E6F4EA',
          backgroundImage: data.farm.backgroundImageUrl
            ? `url(${data.farm.backgroundImageUrl})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {!data.farm.backgroundImageUrl ? (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 32,
              opacity: 0.4,
            }}
          >
            🖼
          </span>
        ) : null}
      </div>

      {/* 아바타 + 농장명 + 지역·재배방식 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: `0 ${space.lg}px ${space.lg}px`,
          marginTop: -48,
          gap: space.xs,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: colors.surface,
            border: `3px solid ${colors.surface}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundImage: data.farm.avatarImageUrl
              ? `url(${data.farm.avatarImageUrl})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!data.farm.avatarImageUrl ? (
            <span style={{ fontSize: 36, fontWeight: 700, color: colors.primary }}>{initial}</span>
          ) : null}
        </div>

        <h1
          style={{
            ...typography.header,
            color: colors.textPrimary,
            margin: 0,
            marginTop: space.sm,
            textAlign: 'center',
          }}
        >
          {farmName}
        </h1>
        {meta ? (
          <p
            style={{
              ...typography.caption,
              color: colors.textSecondary,
              margin: 0,
              textAlign: 'center',
            }}
          >
            {meta}
          </p>
        ) : null}

        {/* 판매처 칩 */}
        {data.salesChannels.length > 0 ? (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: space.xs,
              justifyContent: 'center',
              marginTop: space.sm,
            }}
          >
            {data.salesChannels.map((c) => {
              const m = CHANNEL_META[c.channel] ?? { icon: '🔗', label: c.channel };
              return (
                <a
                  key={c.channel}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: `6px ${space.md}px`,
                    borderRadius: radius.pill,
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.surface,
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{m.icon}</span>
                  <span
                    style={{
                      ...typography.caption,
                      color: colors.textPrimary,
                      fontWeight: 600,
                    }}
                  >
                    {m.label}
                  </span>
                </a>
              );
            })}
          </div>
        ) : null}

        {/* 재배 스토리 (있으면) */}
        {data.farm.story.text ? (
          <p
            style={{
              ...typography.body,
              color: colors.textPrimary,
              marginTop: space.md,
              textAlign: 'center',
              lineHeight: 1.6,
              maxWidth: 480,
            }}
          >
            {data.farm.story.text}
          </p>
        ) : null}
      </div>
    </section>
  );
}
