import type { DiaryPublic, WorkType } from '@/types/profile';
import { colors, radius, space, typography } from '@/styles/tokens';

const WORK_TYPE_LABEL: Record<WorkType, string> = {
  TILLAGE: '경운',
  IRRIGATION: '관수',
  SEEDING: '파종·모내기',
  WEEDING: '제초',
  HARVEST: '수확',
  OTHER_FARMING: '기타 농업활동',
  DAILY: '하루 일상',
};

const WORK_TYPE_ICON: Record<WorkType, string> = {
  TILLAGE: '🌱',
  IRRIGATION: '💧',
  SEEDING: '🌾',
  WEEDING: '✂️',
  HARVEST: '🧺',
  OTHER_FARMING: '🚜',
  DAILY: '🙂',
};

const KOR_DOW = ['일', '월', '화', '수', '목', '금', '토'];

function formatSelectedDate(s: string): string {
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return `${dt.getMonth() + 1}월 ${dt.getDate()}일 ${KOR_DOW[dt.getDay()]}요일 · 영농일지`;
}

export function DiaryCard({ diary }: { diary: DiaryPublic }) {
  return (
    <article
      style={{
        backgroundColor: colors.surface,
        padding: space.lg,
        borderRadius: radius.md,
        border: `1px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        gap: space.sm,
      }}
    >
      <h3
        style={{
          ...typography.title,
          color: colors.textPrimary,
          margin: 0,
          marginBottom: space.xs,
        }}
      >
        {formatSelectedDate(diary.date)}
      </h3>

      {/* 작업 칩 */}
      {diary.workBlocks.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: space.xs }}>
          {diary.workBlocks.map((b) => (
            <span
              key={b.id ?? b.workType}
              style={{
                padding: `4px ${space.sm}px`,
                borderRadius: radius.pill,
                backgroundColor: '#FEE2E2',
                border: '1px solid #FCA5A5',
                ...typography.caption,
                color: '#B91C1C',
                fontWeight: 600,
              }}
            >
              {WORK_TYPE_LABEL[b.workType] ?? b.workType}
            </span>
          ))}
        </div>
      ) : null}

      {/* 날씨 */}
      {diary.weather ? (
        <Row icon="☀">
          {diary.weather.main ?? '-'} · 최고 {diary.weather.tempMax ?? '-'}° 최저{' '}
          {diary.weather.tempMin ?? '-'}°
        </Row>
      ) : null}

      {/* 작물 */}
      {diary.crop ? (
        <Row iconNode={<span style={{ color: diary.crop.colorHex }}>●</span>}>
          {diary.crop.name}
        </Row>
      ) : null}

      {/* 작업 상세 */}
      {diary.workBlocks.map((b) => (
        <Row key={`detail-${b.id ?? b.workType}`} icon={WORK_TYPE_ICON[b.workType] ?? '·'}>
          <strong>{WORK_TYPE_LABEL[b.workType] ?? b.workType}</strong>
          {b.detail ? ` — ${b.detail}` : ''}
        </Row>
      ))}

      {/* 메모 */}
      {diary.memo ? <Row icon="💬">{diary.memo}</Row> : null}

      {/* 사진 슬라이더 */}
      {diary.photos.length > 0 ? <PhotoStrip photos={diary.photos} /> : null}
    </article>
  );
}

function Row({
  icon,
  iconNode,
  children,
}: {
  icon?: string;
  iconNode?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: space.sm, alignItems: 'flex-start' }}>
      <span style={{ width: 16, color: colors.textSecondary, lineHeight: '20px' }}>
        {iconNode ?? icon}
      </span>
      <span
        style={{
          ...typography.body,
          color: colors.textPrimary,
          flex: 1,
          lineHeight: 1.5,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function PhotoStrip({ photos }: { photos: { id: number; url: string; sortOrder: number }[] }) {
  const sorted = [...photos].sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <div
      style={{
        display: 'flex',
        gap: space.sm,
        overflowX: 'auto',
        paddingTop: space.xs,
        marginTop: space.xs,
        borderTop: `1px solid ${colors.border}`,
        scrollbarWidth: 'thin',
      }}
    >
      {sorted.map((p) => (
        <img
          key={p.id}
          src={p.url}
          alt=""
          loading="lazy"
          style={{
            width: 200,
            height: 200,
            objectFit: 'cover',
            borderRadius: radius.sm,
            flexShrink: 0,
            backgroundColor: colors.surfaceMuted,
          }}
        />
      ))}
    </div>
  );
}
