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
      hookTimeout: 500000,
      testTimeout: 500000,
      alias: [
        {
          find: "@azure/identity",
          replacement: resolve(__dirname, `./${dist}/${indexFile}`),
        },
        {
          find: /^internal\/(.*)$/,
          replacement: resolve(__dirname, `./${dist}/$1`),
        },
      ],
      typecheck: {
        enabled: false,
      },
    },
  }),
);
