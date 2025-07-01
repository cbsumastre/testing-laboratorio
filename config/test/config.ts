import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
    globals: true,
    restoreMocks: true,
    environment: 'jsdom',
    setupFiles: ['./config/test/setup.ts'],
  },
});
