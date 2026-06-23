import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '../lib/queryClient';

export const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </BrowserRouter>
  </QueryClientProvider>
);
