import { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { usePublicProfile } from '@/api/profile';
import { usePublicCalendar, usePublicDiariesByDate } from '@/api/diary';
import { ProfileHeader } from '@/components/ProfileHeader';
import { MonthCalendar } from '@/components/MonthCalendar';
import { DiaryCard } from '@/components/DiaryCard';
import { colors, space, typography } from '@/styles/tokens';

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

export function ProfilePage() {
  const { handle } = useParams<{ handle: string }>();
  const profile = usePublicProfile(handle);

  const [ym, setYm] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() + 1 };
  });
  const [selected, setSelected] = useState<string>(todayStr());

  const cal = usePublicCalendar(handle, ym.year, ym.month);

  const tagsByDate = useMemo(() => {
    const m: Record<string, { color: string }[]> = {};
    cal.data?.days.forEach((d) => {
      m[d.date] = d.tags.map((t) => ({ color: t.color }));
    });
    return m;
  }, [cal.data]);

  const cropsLegend = useMemo(() => {
    const m = new Map<string, string>();
    cal.data?.days.forEach((d) =>
      d.tags.forEach((t) => {
        if (!m.has(t.crop)) m.set(t.crop, t.color);
      }),
    );
    return Array.from(m.entries()).map(([crop, color]) => ({ crop, color }));
  }, [cal.data]);

  const selectedDay = cal.data?.days.find((d) => d.date === selected);
  const hasDiary = !!(selectedDay && selectedDay.diaryIds.length > 0);
  const dayDiaries = usePublicDiariesByDate(handle, selected, hasDiary);

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

      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <ProfileHeader data={profile.data} />

        <section style={{ padding: `0 ${space.lg}px`, display: 'flex', flexDirection: 'column', gap: space.md }}>
          <MonthCalendar
            year={ym.year}
            month={ym.month}
            selected={selected}
            tagsByDate={tagsByDate}
            onSelectDate={setSelected}
            onPrevMonth={() =>
              setYm((p) =>
                p.month === 1 ? { year: p.year - 1, month: 12 } : { year: p.year, month: p.month - 1 },
              )
            }
            onNextMonth={() =>
              setYm((p) =>
                p.month === 12 ? { year: p.year + 1, month: 1 } : { year: p.year, month: p.month + 1 },
              )
            }
          />

          {cropsLegend.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: space.md, padding: `0 ${space.xs}px` }}>
              {cropsLegend.map(({ crop, color }) => (
                <div key={crop} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div
                    style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: color }}
                  />
                  <span style={{ ...typography.caption, color: colors.textSecondary }}>{crop}</span>
                </div>
              ))}
            </div>
          ) : null}

          {hasDiary ? (
            dayDiaries.isLoading ? (
              <div
                style={{
                  padding: space.lg,
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  textAlign: 'center',
                  border: `1px solid ${colors.border}`,
                }}
              >
                <span style={{ ...typography.body, color: colors.textSecondary }}>
                  일지 불러오는 중...
                </span>
              </div>
            ) : (
              (dayDiaries.data ?? []).map((d) => <DiaryCard key={d.id} diary={d} />)
            )
          ) : (
            <div
              style={{
                padding: space.lg,
                backgroundColor: colors.surface,
                borderRadius: 12,
                textAlign: 'center',
                border: `1px solid ${colors.border}`,
              }}
            >
              <span style={{ ...typography.body, color: colors.textSecondary }}>
                이 날에는 작성된 일지가 없습니다.
              </span>
            </div>
          )}
        </section>
      </div>

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
        marginTop: space.xl,
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
