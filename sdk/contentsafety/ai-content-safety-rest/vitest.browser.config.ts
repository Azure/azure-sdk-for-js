// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";
import copy from "rollup-plugin-copy";
import { dirname, resolve } from "path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceImage = resolve(__dirname, "./samples-dev/example-data/image.png");
const dest = resolve(__dirname, "./dist-test/browser/samples-dev/example-data");

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      copy({
        targets: [{ src: sourceImage, dest: dest }],
      }),
    ],
    test: {
      include: ["dist-test/browser/test/**/*.spec.js"],
      hookTimeout: 5000000,
      testTimeout: 5000000,
    },
  }),
);
