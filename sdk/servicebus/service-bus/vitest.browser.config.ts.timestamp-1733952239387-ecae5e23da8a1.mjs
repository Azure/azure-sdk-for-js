// vitest.browser.config.ts
import { defineConfig } from "file:///home/dealmaha/azure-sdk-for-js/common/temp/node_modules/.pnpm/vitest@2.1.8_@types+node@18.19.67_@vitest+browser@2.1.8/node_modules/vitest/dist/config.js";
import browserMap from "file:///home/dealmaha/azure-sdk-for-js/common/tools/vite-plugin-browser-test-map/dist/index.js";
import inject from "file:///home/dealmaha/azure-sdk-for-js/common/temp/node_modules/.pnpm/@rollup+plugin-inject@5.0.5_rollup@4.28.0/node_modules/@rollup/plugin-inject/dist/es/index.js";
var vitest_browser_config_default = defineConfig({
  define: {
    "process.env": process.env
  },
  optimizeDeps: {
    include: ["process", "buffer"]
  },
  plugins: [
    browserMap(),
    inject({ process: "process", Buffer: ["buffer", "Buffer"], stream: ["stream", "stream"] })
  ],
  test: {
    testTimeout: 6e5,
    hookTimeout: 6e4,
    fileParallelism: false,
    include: ["dist-test/browser/**/*.spec.js"],
    reporters: ["verbose", "junit"],
    outputFile: {
      junit: "test-results.browser.xml"
    },
    browser: {
      enabled: true,
      headless: true,
      name: "chromium",
      provider: "playwright",
      providerOptions: {
        launch: {
          bypassCSP: true,
          args: ["--no-sandbox", "--disable-web-security"]
        }
      }
    },
    watch: false,
    coverage: {
      include: ["dist-test/browser/**/*.js"],
      exclude: [
        "dist-test/browser/**/*./*-browser.mjs",
        "dist-test/browser/**/*./*-react-native.mjs"
      ],
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage-browser"
    }
  }
});
export {
  vitest_browser_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmJyb3dzZXIuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvZGVhbG1haGEvYXp1cmUtc2RrLWZvci1qcy9zZGsvc2VydmljZWJ1cy9zZXJ2aWNlLWJ1c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZGVhbG1haGEvYXp1cmUtc2RrLWZvci1qcy9zZGsvc2VydmljZWJ1cy9zZXJ2aWNlLWJ1cy92aXRlc3QuYnJvd3Nlci5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZGVhbG1haGEvYXp1cmUtc2RrLWZvci1qcy9zZGsvc2VydmljZWJ1cy9zZXJ2aWNlLWJ1cy92aXRlc3QuYnJvd3Nlci5jb25maWcudHNcIjsvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVzdC9jb25maWdcIjtcbmltcG9ydCBicm93c2VyTWFwIGZyb20gXCJAYXp1cmUtdG9vbHMvdml0ZS1wbHVnaW4tYnJvd3Nlci10ZXN0LW1hcFwiO1xuaW1wb3J0IGluamVjdCBmcm9tIFwiQHJvbGx1cC9wbHVnaW4taW5qZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGRlZmluZToge1xuICAgIFwicHJvY2Vzcy5lbnZcIjogcHJvY2Vzcy5lbnYsXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcInByb2Nlc3NcIiwgXCJidWZmZXJcIl0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBicm93c2VyTWFwKCksXG4gICAgaW5qZWN0KHsgcHJvY2VzczogXCJwcm9jZXNzXCIsIEJ1ZmZlcjogW1wiYnVmZmVyXCIsIFwiQnVmZmVyXCJdLCBzdHJlYW06IFtcInN0cmVhbVwiLCBcInN0cmVhbVwiXSB9KSxcbiAgXSxcbiAgdGVzdDoge1xuICAgIHRlc3RUaW1lb3V0OiA2MDAwMDAsXG4gICAgaG9va1RpbWVvdXQ6IDYwMDAwLFxuICAgIGZpbGVQYXJhbGxlbGlzbTogZmFsc2UsXG4gICAgaW5jbHVkZTogW1wiZGlzdC10ZXN0L2Jyb3dzZXIvKiovKi5zcGVjLmpzXCJdLFxuICAgIHJlcG9ydGVyczogW1widmVyYm9zZVwiLCBcImp1bml0XCJdLFxuICAgIG91dHB1dEZpbGU6IHtcbiAgICAgIGp1bml0OiBcInRlc3QtcmVzdWx0cy5icm93c2VyLnhtbFwiLFxuICAgIH0sXG4gICAgYnJvd3Nlcjoge1xuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIGhlYWRsZXNzOiB0cnVlLFxuICAgICAgbmFtZTogXCJjaHJvbWl1bVwiLFxuICAgICAgcHJvdmlkZXI6IFwicGxheXdyaWdodFwiLFxuICAgICAgcHJvdmlkZXJPcHRpb25zOiB7XG4gICAgICAgIGxhdW5jaDoge1xuICAgICAgICAgIGJ5cGFzc0NTUDogdHJ1ZSxcbiAgICAgICAgICBhcmdzOiBbXCItLW5vLXNhbmRib3hcIiwgXCItLWRpc2FibGUtd2ViLXNlY3VyaXR5XCJdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHdhdGNoOiBmYWxzZSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgaW5jbHVkZTogW1wiZGlzdC10ZXN0L2Jyb3dzZXIvKiovKi5qc1wiXSxcbiAgICAgIGV4Y2x1ZGU6IFtcbiAgICAgICAgXCJkaXN0LXRlc3QvYnJvd3Nlci8qKi8qLi8qLWJyb3dzZXIubWpzXCIsXG4gICAgICAgIFwiZGlzdC10ZXN0L2Jyb3dzZXIvKiovKi4vKi1yZWFjdC1uYXRpdmUubWpzXCIsXG4gICAgICBdLFxuICAgICAgcHJvdmlkZXI6IFwiaXN0YW5idWxcIixcbiAgICAgIHJlcG9ydGVyOiBbXCJ0ZXh0XCIsIFwianNvblwiLCBcImh0bWxcIl0sXG4gICAgICByZXBvcnRzRGlyZWN0b3J5OiBcImNvdmVyYWdlLWJyb3dzZXJcIixcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBR0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxZQUFZO0FBRW5CLElBQU8sZ0NBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLGVBQWUsUUFBUTtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsV0FBVyxRQUFRO0FBQUEsRUFDL0I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLE9BQU8sRUFBRSxTQUFTLFdBQVcsUUFBUSxDQUFDLFVBQVUsUUFBUSxHQUFHLFFBQVEsQ0FBQyxVQUFVLFFBQVEsRUFBRSxDQUFDO0FBQUEsRUFDM0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLGlCQUFpQjtBQUFBLElBQ2pCLFNBQVMsQ0FBQyxnQ0FBZ0M7QUFBQSxJQUMxQyxXQUFXLENBQUMsV0FBVyxPQUFPO0FBQUEsSUFDOUIsWUFBWTtBQUFBLE1BQ1YsT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLGlCQUFpQjtBQUFBLFFBQ2YsUUFBUTtBQUFBLFVBQ04sV0FBVztBQUFBLFVBQ1gsTUFBTSxDQUFDLGdCQUFnQix3QkFBd0I7QUFBQSxRQUNqRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsTUFDUixTQUFTLENBQUMsMkJBQTJCO0FBQUEsTUFDckMsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBVTtBQUFBLE1BQ1YsVUFBVSxDQUFDLFFBQVEsUUFBUSxNQUFNO0FBQUEsTUFDakMsa0JBQWtCO0FBQUEsSUFDcEI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
