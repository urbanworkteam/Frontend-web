export type SalesChannelCode = 'SMARTSTORE' | 'INSTAGRAM' | 'DAANGN';

export type BlockType = 'CROP_INTRO' | 'STORY' | 'CALENDAR' | 'TEXT' | 'DIVIDER';

export type PublicProfileResponse = {
  handle: string;
  farm: {
    farmName: string | null;
    region: string | null;
    farmingMethod: string | null;
    backgroundImageUrl: string | null;
    avatarImageUrl: string | null;
    story: { text: string | null; imageUrls: string[]; videoUrl: string | null };
  };
  salesChannels: { channel: SalesChannelCode; url: string }[];
  blocks: { blockType: BlockType; sortOrder: number; payload: Record<string, unknown> }[];
};

export type WorkType =
  | 'TILLAGE'
  | 'IRRIGATION'
  | 'SEEDING'
  | 'WEEDING'
  | 'HARVEST'
  | 'OTHER_FARMING'
  | 'DAILY';

export type CalendarMonth = {
  days: {
    date: string;
    tags: { crop: string; color: string; workType: WorkType }[];
    diaryIds: number[];
  }[];
};

export type DiaryPublic = {
  id: number;
  date: string;
  farmLocation: { id: number; label: string } | null;
  crop: { id: number; name: string; colorHex: string } | null;
  weather: {
    main: string | null;
    tempMax: number | null;
    tempMin: number | null;
    precipitationMm: number | null;
    humidityPct: number | null;
    source: string;
  } | null;
  workBlocks: { id?: number; workType: WorkType; detail: string | null; sortOrder?: number }[];
  memo: string | null;
  photos: { id: number; url: string; sortOrder: number }[];
  createdAt: string;
  updatedAt: string;
};
