import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 30000,
    exclude: ['misc/**', 'dist/**', 'node_modules/**'],
  },
});
