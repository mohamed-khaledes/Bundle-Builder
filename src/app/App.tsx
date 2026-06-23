import { Routes, Route, Navigate } from 'react-router-dom';
import { BuilderPage } from './BuilderPage';
import { ProductPage } from '../features/product/ProductPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<BuilderPage />} />
    <Route path="/product/:productId" element={<ProductPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
