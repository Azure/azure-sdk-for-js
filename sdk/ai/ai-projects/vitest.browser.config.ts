// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";

// The voice-agent live-test pipeline (tests.yml / test-resources.bicep) provisions only the
// resources needed for the realtime/voice-agent scenarios. When it sets this flag, scope the
// run to just that suite so the rest of the package's live tests - which need additional
// resources/connections (AI Search, storage, SharePoint, Fabric, A2A, etc.) that this pipeline
// does not provision - are not selected and don't fail from missing configuration.
const voiceAgentLiveTestsOnly = process.env.VOICE_AGENT_LIVE_TESTS_ONLY === "true";
const scopedViteConfig = voiceAgentLiveTestsOnly
  ? {
      ...viteConfig,
      test: {
        ...viteConfig.test,
        include: ["dist-test/browser/test/public/realtime/**/*.spec.js"],
      },
    }
  : viteConfig;

export default mergeConfig(
  scopedViteConfig,
  defineConfig({
    test: {
      browser: {
        api: {
          host: "127.0.0.1",
          port: 54322,
        },
      },
    },
    optimizeDeps: {
      exclude: ["@azure/core-lro"],
    },
  }),
);
