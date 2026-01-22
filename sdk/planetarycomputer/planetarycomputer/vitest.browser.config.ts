// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";

const config = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // PlanetaryComputer tests require external service access.
      // In playback/record modes, only run tests that don't require browser-specific recordings.
      // Browser recordings are not available for this package yet.
    },
  }),
);

// Skip browser tests in playback mode since browser recordings don't exist yet.
// Browser tests require separate recordings from node tests due to different runtime environments.
// Allow tests to run in "live" and "record" modes.
if (process.env.TEST_MODE === "playback") {
  // Skip all tests since no browser recordings exist yet
  config.test.include = [];
  config.test.passWithNoTests = true;
}

export default config;
