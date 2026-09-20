// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

// The live-test pipeline (tests.yml) only provisions Foundry endpoint/model env vars for Voice
// Agents, not the many other env vars (AI Search, Bing, storage, etc.) this package's other live
// tests need. Restrict that pipeline's live run to just the Voice Agent specs so its signal
// reflects Voice Agents specifically. This has no effect on any other invocation of
// `pnpm test:node` (local dev, playback/record CI, etc.), since TEST_SCOPE is only ever set by
// tests.yml.
export default process.env["TEST_SCOPE"] === "voiceAgents"
  ? (() => {
      // mergeConfig concatenates array fields (like test.include) rather than replacing them, so
      // build off a cloned config via an empty merge, then replace include/exclude directly.
      const scoped = mergeConfig(viteConfig, defineConfig({}));
      scoped.test = { ...scoped.test, include: ["test/**/voiceAgent*.spec.ts"], exclude: [] };
      return scoped;
    })()
  : viteConfig;
