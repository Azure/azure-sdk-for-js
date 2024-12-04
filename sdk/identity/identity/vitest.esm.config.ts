// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vitest.config.ts";
import { resolve } from "node:path";

const distPath = "./dist/esm";
const distPathAbsolute = resolve(distPath);
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      alias: {
        "@azure/identity": resolve(`${distPath}/index.js`),
        "../../../../src": distPathAbsolute,
        "../../../src": distPathAbsolute,
        "../../src": distPathAbsolute,
        "../src": distPathAbsolute,
      },
    },
  }),
);
