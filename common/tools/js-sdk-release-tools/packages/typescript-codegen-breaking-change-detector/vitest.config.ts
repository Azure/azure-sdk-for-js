import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['misc/**', 'dist/**', 'node_modules/**'],
  },
});
