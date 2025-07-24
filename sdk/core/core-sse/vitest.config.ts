// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

const isCI = process.env["SYSTEM_TEAMPROJECTID"] !== undefined;
const [dist, indexFile] = isCI ? ["dist/esm", "index.js"] : ["src", "index.ts"];
const __dirname = dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      alias: [
        {
          find: "@azure/core-sse",
          replacement: resolve(__dirname, `./${dist}/${indexFile}`),
        },
        {
          find: /^internal\/(.*)$/,
          replacement: resolve(__dirname, `./${dist}/$1`),
        },
      ],
      fileParallelism: false,
      testTimeout: 30000,
      globalSetup: "test/server/start.mts",
    },
  }),
);
