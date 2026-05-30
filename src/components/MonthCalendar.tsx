import { useMemo } from 'react';
import { colors, radius, space, typography } from '@/styles/tokens';

export type Tag = { color: string };

type Props = {
  year: number;
  month: number; // 1-12
  selected: string | null;
  tagsByDate: Record<string, Tag[]>;
  onSelectDate: (date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export function MonthCalendar({
  year,
  month,
  selected,
  tagsByDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: Props) {
  const cells = useMemo(() => {
    const first = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0).getDate();
    const startWeekday = first.getDay();
    const arr: (string | null)[] = [];
    for (let i = 0; i < startWeekday; i++) arr.push(null);
    for (let d = 1; d <= lastDay; d++) {
      arr.push(`${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
    }
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [year, month]);

  return (
    <div
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        padding: space.md,
        border: `1px solid ${colors.border}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${space.sm}px ${space.sm}px`,
        }}
      >
        <button
          onClick={onPrevMonth}
          aria-label="이전 달"
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: 24,
            color: colors.textPrimary,
            padding: `0 ${space.md}px`,
          }}
        >
          ‹
        </button>
        <span style={{ ...typography.title, color: colors.textPrimary }}>
          {year}년 {month}월
        </span>
        <button
          onClick={onNextMonth}
          aria-label="다음 달"
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: 24,
            color: colors.textPrimary,
            padding: `0 ${space.md}px`,
          }}
        >
          ›
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {WEEKDAYS.map((w, i) => (
          <div
            key={w}
            style={{
              textAlign: 'center',
              ...typography.caption,
              color: i === 0 ? colors.danger : i === 6 ? colors.info : colors.textSecondary,
              padding: `${space.xs}px 0`,
            }}
          >
            {w}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} style={{ aspectRatio: '1', padding: 4 }} />;
          const tags = tagsByDate[d] ?? [];
          const sel = selected === d;
          const day = parseInt(d.split('-')[2], 10);
          const weekdayIdx = i % 7;
          return (
            <button
              key={d}
              onClick={() => onSelectDate(d)}
              style={{
                aspectRatio: '1',
                background: 'transparent',
                border: 'none',
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: sel ? colors.primary : 'transparent',
                }}
              >
                <span
                  style={{
                    ...typography.body,
                    color: sel
                      ? '#fff'
                      : weekdayIdx === 0
                        ? colors.danger
                        : weekdayIdx === 6
                          ? colors.info
                          : colors.textPrimary,
                  }}
                >
                  {day}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 3, minHeight: 6 }}>
                {tags.slice(0, 3).map((t, j) => (
                  <div
                    key={j}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      backgroundColor: t.color,
                    }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
