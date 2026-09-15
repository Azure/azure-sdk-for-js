// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vite";
import { localAzureDevelopmentPlugin } from "./server/localAzureDevelopmentPlugin.js";

export default defineConfig({
  plugins: [localAzureDevelopmentPlugin()],
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
