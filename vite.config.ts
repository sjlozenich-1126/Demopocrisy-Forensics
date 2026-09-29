import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function syncDataPlugin(): Plugin {
  return {
    name: 'sync-data-endpoint',
    configureServer(server) {
      server.middlewares.use('/api/sync-data', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const targetFile = path.resolve(__dirname, 'src/data/customData.json');
              let existing: Record<string, unknown> = {};
              if (fs.existsSync(targetFile)) {
                try {
                  existing = JSON.parse(fs.readFileSync(targetFile, 'utf-8'));
                } catch {
                  existing = {};
                }
              }
              const merged = { ...existing, ...data };
              fs.writeFileSync(targetFile, JSON.stringify(merged, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Codebase data updated successfully' }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: String(err) }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), syncDataPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
