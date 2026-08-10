// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";

const config = mergeConfig(viteConfig, defineConfig({}));

if (config.test) {
  config.test.include = ["dist-test/browser/test/browser/**/*.spec.js"];
}

export default config;
