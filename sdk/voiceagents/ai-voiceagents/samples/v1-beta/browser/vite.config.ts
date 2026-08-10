// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { localAzureDevelopmentPlugin } from "./server/localAzureDevelopmentPlugin.js";

export default defineConfig({
  plugins: [localAzureDevelopmentPlugin()],
  resolve: {
    alias: {
      "#platform/webSocketTransport": fileURLToPath(
        new URL("../../../src/streaming/webSocketTransport-browser.mts", import.meta.url),
      ),
    },
    preserveSymlinks: true,
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
  },
});
