import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* 모킹의 공유 URL 형식: farmily.info/@handle
          React Router 7 의 path 매칭이 "@" prefix 와 어색하게 동작해서 path 는
          /:handle 으로 받고 ProfilePage 에서 "@" 를 제거. /@xxx 와 /xxx 둘 다 지원. */}
      <Route path="/:handle" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
