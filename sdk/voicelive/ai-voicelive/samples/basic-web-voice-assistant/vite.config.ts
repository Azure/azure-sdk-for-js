import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    // Enable file watching for SDK source changes
    watch: {
      usePolling: true,
      interval: 300
    }
  },
  // Configure to watch node_modules changes
  optimizeDeps: {
    force: true // Force dependency re-optimization on restart
  }
});