// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    browserField: true,
  },
  test: {
    browser: {
      enabled: true,
      headless: true,
      name: "chromium",
      provider: "playwright",
    },
    fakeTimers: {
      toFake: ["setTimeout"],
    },
    watch: false,
    include: ["test/**/*.spec.ts"],
    exclude: ["test/**/node/*.spec.ts"],
  },
});
