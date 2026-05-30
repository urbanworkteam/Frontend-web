# Farmily Web

소비자가 농가 명함 URL(`farmily.kr/@<handle>`)로 접근했을 때 보는 공개 명함 SPA. 모바일 앱(`urbanworkteam/Frontend`)과 별도 레포로 운영합니다.

## 스택

- Vite + React 19 + TypeScript 6
- React Router 7
- TanStack Query 5
- axios

모바일 앱과 동일한 디자인 토큰(`src/styles/tokens.ts`)을 복사해 사용합니다.

## 처음 한 번

```bash
git clone https://github.com/urbanworkteam/Frontend-web.git
cd Frontend-web
npm install
cp .env.example .env.local   # VITE_API_BASE 채움
```

## 실행

```bash
npm run dev       # http://localhost:5173
npm run build     # 정적 빌드 → dist/
npm run preview   # 빌드 미리보기
npm run typecheck # tsc --noEmit
```

## 라우팅

| 경로 | 화면 |
| --- | --- |
| `/` | 홈 안내 |
| `/@:handle` | 공개 명함 (다음 PR 구현) |
| `*` | 404 |

## 백엔드 endpoint (인증 불필요)

| 메서드 | 경로 |
| --- | --- |
| GET | `/api/v1/public/farms/{handle}` |
| GET | `/api/v1/public/farms/{handle}/calendar?year=&month=` |
| GET | `/api/v1/public/farms/{handle}/calendar/{date}` |
| GET | `/api/v1/public/farms/{handle}/exists` |

## 환경 변수

| 키 | 예시 | 설명 |
| --- | --- | --- |
| `VITE_API_BASE` | `http://localhost:8080` | 백엔드 base URL. 배포 시 `https://api.farmily.kr` 등 |

`VITE_PUBLIC_*` 또는 `VITE_*` 접두사만 클라이언트 번들에 포함됩니다.

## 브랜치 전략

PR 마다 새 브랜치를 만들지 않고, 아래 **4개의 고정 브랜치**만 사용합니다.

| 브랜치 | 용도 | 머지 대상 |
| --- | --- | --- |
| `main` | 운영(릴리스) 기준. 직접 push 금지 | — |
| `dev` | 일반 개발/통합용 | `main` |
| `feat` | 신규 기능 작업 | `dev` 또는 `main` |
| `hotfix` | 운영 긴급 패치 | `main` |

## 배포 (예정)

S3 정적 호스팅 + CloudFront. 도메인 `farmily.kr` 미등록 상태.
