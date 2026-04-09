import { defineConfig } from "vite";
import path from "path";

// Azure SDK packages use nested conditional exports (browser > types/default)
// that Vite's esbuild dep scanner cannot resolve. We alias each package
// directly to its pre-built browser entry point.
const azurePkgs = [
  "@azure/ai-voicelive",
  "@azure/logger",
  "@azure/core-util",
  "@azure/core-auth",
  "@azure/abort-controller",
  "@azure/core-rest-pipeline",
];

function azureAliases() {
  return [
    ...azurePkgs.map((pkg) => ({
      find: pkg,
      replacement: path.resolve(__dirname, "node_modules", pkg, "dist/browser/index.js"),
    })),
    // Deduplicate @opentelemetry/api — the SDK has its own nested copy under
    // node_modules/@azure/ai-voicelive/node_modules/@opentelemetry/api.
    // Both must resolve to the SAME instance so that provider.register()
    // and the SDK's tryLoadOtel() share the same global symbol.
    {
      find: "@opentelemetry/api",
      replacement: path.resolve(__dirname, "node_modules/@opentelemetry/api"),
    },
  ];
}

export default defineConfig({
  root: ".",
  define: {
    // The SDK reads process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING
    // via globalThis["process"]. Vite normally replaces process.env.*
    // references at build time. Provide the gate value so tracing activates.
    "process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING": JSON.stringify("true"),
    "process.env.NODE_ENV": JSON.stringify("development"),
  },
  build: {
    target: "es2020",
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  resolve: {
    alias: azureAliases(),
  },
  server: {
    port: 3001,
    host: true,
  },
  optimizeDeps: {
    exclude: azurePkgs,
    force: true,
  },
});
