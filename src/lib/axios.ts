import axios from 'axios';

// Single shared Axios instance. baseURL '/api' is forwarded to the Express
// backend by the Vite dev proxy (see vite.config.ts).
export const http = axios.create({
  baseURL: '/api',
  timeout: 10_000,
  headers: { Accept: 'application/json' },
});
