import { useState } from 'react';
import { IoPartlySunnyOutline, IoLeafOutline, IoDocumentTextOutline } from 'react-icons/io5';
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

const KOR_DOW = ['일', '월', '화', '수', '목', '금', '토'];

function formatSelectedDate(s: string): string {
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return `${dt.getMonth() + 1}월 ${dt.getDate()}일 ${KOR_DOW[dt.getDay()]}요일`;
}

export function DiaryCard({ diary }: { diary: DiaryPublic }) {
  return (
    <article
      style={{
        backgroundColor: colors.surface,
        borderRadius: 16,
        border: `1px solid ${colors.border}`,
        overflow: 'hidden',
      }}
    >
      {/* 사진 영역 (있을 때만) */}
      {diary.photos.length > 0 ? <PhotoStrip photos={diary.photos} /> : null}

      <div style={{ padding: `${space.lg}px`, display: 'flex', flexDirection: 'column', gap: space.md }}>
        {/* 헤더: 날짜 + 작업 태그 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: space.sm }}>
          <h3 style={{ ...typography.bodyBold, color: colors.textPrimary, margin: 0 }}>
            {formatSelectedDate(diary.date)}
          </h3>
          {diary.workBlocks.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {diary.workBlocks.map((b) => (
                <span
                  key={b.id ?? b.workType}
                  style={{
                    padding: '3px 10px',
                    borderRadius: 20,
                    backgroundColor: '#E6F4EA',
                    ...typography.caption,
                    color: colors.primary,
                    fontWeight: 600,
                    fontSize: 11,
                  }}
                >
                  {WORK_TYPE_LABEL[b.workType] ?? b.workType}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* 정보 라인들 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: space.sm }}>
          {diary.crop ? (
            <InfoRow
              label="작물"
              dot={diary.crop.colorHex}
            >
              {diary.crop.name}
            </InfoRow>
          ) : null}

          {diary.weather ? (
            <InfoRow label="날씨" icon={<IoPartlySunnyOutline size={14} color={colors.textTertiary} />}>
              {diary.weather.main ?? '-'} · {diary.weather.tempMax ?? '-'}° / {diary.weather.tempMin ?? '-'}°
            </InfoRow>
          ) : null}

          {diary.workBlocks.map((b) => (
            <InfoRow key={`detail-${b.id ?? b.workType}`} label={WORK_TYPE_LABEL[b.workType] ?? b.workType} icon={<IoLeafOutline size={14} color={colors.textTertiary} />}>
              {b.detail || '-'}
            </InfoRow>
          ))}

          {diary.memo ? (
            <InfoRow label="메모" icon={<IoDocumentTextOutline size={14} color={colors.textTertiary} />}>{diary.memo}</InfoRow>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function InfoRow({
  label,
  dot,
  icon,
  children,
}: {
  label: string;
  dot?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: space.sm, alignItems: 'flex-start' }}>
      <span style={{ width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '20px', flexShrink: 0 }}>
        {dot ? (
          <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 6, backgroundColor: dot }} />
        ) : icon ? icon : null}
      </span>
      <span
        style={{
          ...typography.caption,
          color: colors.textTertiary,
          minWidth: 36,
          lineHeight: '20px',
        }}
      >
        {label}
      </span>
      <span
        style={{
          ...typography.body,
          color: colors.textPrimary,
          flex: 1,
          lineHeight: '20px',
        }}
      >
        {children}
      </span>
    </div>
  );
}

function PhotoStrip({ photos }: { photos: { id: number; url: string; sortOrder: number }[] }) {
  const sorted = [...photos].sort((a, b) => a.sortOrder - b.sortOrder);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {sorted.length === 1 ? (
        <img
          src={sorted[0].url}
          alt=""
          loading="lazy"
          onClick={() => setLightboxIndex(0)}
          style={{
            width: '100%',
            height: 200,
            objectFit: 'cover',
            display: 'block',
            cursor: 'pointer',
          }}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            gap: 2,
            overflow: 'hidden',
            height: 160,
          }}
        >
          {sorted.map((p, i) => (
            <img
              key={p.id}
              src={p.url}
              alt=""
              loading="lazy"
              onClick={() => setLightboxIndex(i)}
              style={{
                flex: 1,
                height: '100%',
                objectFit: 'cover',
                minWidth: 0,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}

      {lightboxIndex !== null ? (
        <Lightbox
          photos={sorted}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i! > 0 ? i! - 1 : sorted.length - 1))}
          onNext={() => setLightboxIndex((i) => (i! < sorted.length - 1 ? i! + 1 : 0))}
        />
      ) : null}
    </>
  );
}

function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  photos: { id: number; url: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        gap: 16,
      }}
    >
      <img
        src={photos[currentIndex].url}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90%',
          maxHeight: '70vh',
          objectFit: 'contain',
          borderRadius: 8,
        }}
      />

      {photos.length > 1 ? (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ display: 'flex', alignItems: 'center', gap: 24 }}
        >
          <button
            onClick={onPrev}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              fontSize: 24,
              width: 40,
              height: 40,
              borderRadius: 20,
              cursor: 'pointer',
            }}
          >
            ‹
          </button>
          <span style={{ color: '#fff', ...typography.body }}>
            {currentIndex + 1} / {photos.length}
          </span>
          <button
            onClick={onNext}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              fontSize: 24,
              width: 40,
              height: 40,
              borderRadius: 20,
              cursor: 'pointer',
            }}
          >
            ›
          </button>
        </div>
      ) : null}

      <button
        onClick={onClose}
        style={{
          background: 'rgba(255,255,255,0.15)',
          border: 'none',
          color: '#fff',
          ...typography.body,
          padding: '8px 24px',
          borderRadius: 20,
          cursor: 'pointer',
        }}
      >
        ✕ 닫기
      </button>
    </div>
  );
}
