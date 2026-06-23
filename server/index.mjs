// Tiny Express backend — reads the local data.json and serves it over HTTP.
// No database. One endpoint: GET /api/system → full catalog + seeded defaults.
import express from 'express';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, 'data.json');
const DIST_DIR = join(__dirname, '..', 'dist');
const PORT = process.env.PORT ?? 5174;

const app = express();

// Read fresh on each request so editing data.json doesn't need a restart.
app.get('/api/system', async (_req, res) => {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8');
    res.type('application/json').send(raw);
  } catch (err) {
    console.error('Failed to read data.json:', err);
    res.status(500).json({ error: 'Failed to load system catalog' });
  }
});

// Single product by id — same local-JSON-over-HTTP pattern, clean 404.
app.get('/api/products/:id', async (req, res) => {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8');
    const { products } = JSON.parse(raw);
    const product = products.find((p) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Failed to read data.json:', err);
    res.status(500).json({ error: 'Failed to load product' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

if (existsSync(DIST_DIR)) {
  // Production: serve the built frontend from this same origin, with an
  // SPA fallback for any non-API GET. (A final catch-all middleware avoids
  // Express 5's stricter wildcard-path syntax.)
  app.use(express.static(DIST_DIR));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(join(DIST_DIR, 'index.html'));
    }
    next();
  });
} else {
  // Dev: the UI is served by Vite on :5173 — point people there instead of
  // a bare "Cannot GET /".
  app.get('/', (_req, res) =>
    res
      .type('html')
      .send(
        `<!doctype html><meta charset="utf-8"><title>Wyze API</title>
         <body style="font-family:system-ui;max-width:34rem;margin:4rem auto;line-height:1.6;color:#1c1d22">
         <h1>✅ API is running</h1>
         <p>This is the data API (<code>GET /api/system</code>). The app UI is served by Vite:</p>
         <p><a href="http://localhost:5173" style="color:#4f2fdc;font-weight:600">→ http://localhost:5173</a></p>
         <p style="color:#6b7280">Tip: run <code>npm run dev</code> to start both. To serve the built app from this port instead, run <code>npm run build</code> first.</p>
         </body>`
      )
  );
}

app.listen(PORT, () => {
  console.log(`API ready → http://localhost:${PORT}/api/system`);
  if (!existsSync(DIST_DIR)) {
    console.log(`UI (dev)  → http://localhost:5173`);
  }
});
