import { useMemo } from 'react';
import { colors, radius, space, typography } from '@/styles/tokens';

export type Tag = { color: string; label?: string };

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
          if (!d) return <div key={i} style={{ height: 66, padding: 4 }} />;
          const tags = tagsByDate[d] ?? [];
          const sel = selected === d;
          const day = parseInt(d.split('-')[2], 10);
          const weekdayIdx = i % 7;
          const visibleTags = tags.slice(0, 2);
          return (
            <button
              key={d}
              onClick={() => onSelectDate(d)}
              style={{
                height: 66,
                background: 'transparent',
                border: 'none',
                padding: '3px 1px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                cursor: 'pointer',
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
              <div
                style={{
                  width: '100%',
                  minHeight: 28,
                  marginTop: 1,
                  padding: '0 1px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {visibleTags.map((t, j) =>
                  t.label ? (
                    <span
                      key={`${t.label}-${j}`}
                      style={{
                        boxSizing: 'border-box',
                        maxWidth: '100%',
                        height: 15,
                        padding: '1px 4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        border: `1px solid ${t.color}`,
                        borderRadius: radius.sm,
                        backgroundColor: `${t.color}1F`,
                        color: t.color,
                        fontSize: 9,
                        lineHeight: '11px',
                        fontWeight: 600,
                      }}
                    >
                      {t.label}
                    </span>
                  ) : (
                    <span
                      key={j}
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: radius.pill,
                        backgroundColor: t.color,
                      }}
                    />
                  ),
                )}
                {tags.length > visibleTags.length ? (
                  <span
                    style={{
                      color: colors.textTertiary,
                      fontSize: 9,
                      lineHeight: '11px',
                    }}
                  >
                    +{tags.length - visibleTags.length}
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
