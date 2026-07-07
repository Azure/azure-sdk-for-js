import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 30000,
    exclude: ['src/test/testCases/**', 'dist/**', '**/node_modules/**', '**/misc/**', 'packages/**'],
  },
});
