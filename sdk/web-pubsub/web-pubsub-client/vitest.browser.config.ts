// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../eng/vitestconfigs/browser.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({}),
);
