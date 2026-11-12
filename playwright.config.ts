import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  reporter: process.env.CI ? 'line' : 'list',
  use: { baseURL: 'http://localhost:5173' },
  webServer: {
    command: 'npx --yes http-server app -p 5173 -s -c-1',
    url: 'http://localhost:5173/ergebnisseite.html',
    reuseExistingServer: !process.env.CI,
  },
});
