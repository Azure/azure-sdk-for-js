import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['src/test/testCases/**', 'dist/**', '**/node_modules/**', '**/misc/**', 'packages/**'],
  },
});
