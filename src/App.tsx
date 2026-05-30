import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* 모킹의 공유 URL 형식: farmily.kr/@handle */}
      <Route path="/@:handle" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
