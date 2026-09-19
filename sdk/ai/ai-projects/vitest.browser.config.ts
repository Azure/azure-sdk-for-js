// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import viteConfig from "../../../vitest.browser.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      browser: {
        api: {
          host: "127.0.0.1",
          port: 54322,
        },
        provider: playwright({
          launchOptions: {
            args: [
              "--disable-web-security",
              // The Voice Agents realtime WebSocket endpoint doesn't support Chrome's HTTP/2
              // "Extended CONNECT" WebSocket upgrade (RFC 8441), which Chrome will attempt to use
              // to reuse an already-open HTTP/2 connection to the same origin (e.g. from a prior
              // REST call the test made, such as creating the test agent). Without this flag,
              // any WebSocket connect() that follows an earlier HTTPS request to the same host in
              // the same test disconnects with an opaque "WebSocket connection failed" error, even
              // though a standalone connection (no prior request to the host) succeeds.
              "--disable-http2",
            ],
          },
          contextOptions: {
            // Playwright's headless Chromium reports "HeadlessChrome" in its User-Agent, which is
            // rejected by the Voice Agents endpoint (most likely bot-detection at the ingress).
            // Overriding just the product token to a normal "Chrome" UA is enough to pass; the
            // exact version number here doesn't need to track Playwright's bundled Chromium build.
            userAgent:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          },
        }),
      },
    },
    optimizeDeps: {
      exclude: ["@azure/core-lro"],
    },
  }),
);
