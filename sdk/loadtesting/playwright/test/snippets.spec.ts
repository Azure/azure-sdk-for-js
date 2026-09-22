// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { createAzurePlaywrightConfig } from "@azure/playwright";
import { defineConfig } from "@playwright/test";
import { DefaultAzureCredential } from "@azure/identity";

describe("snippets", () => {
  it("configure_reporters", () => {
    const credential = new DefaultAzureCredential();
    const playwrightConfig = defineConfig({});
    defineConfig(playwrightConfig, createAzurePlaywrightConfig(playwrightConfig, { credential }), {
      reporter: [
        ["html", { open: "never" }], // HTML reporter must come first
        ["@azure/playwright/reporter"], // Azure reporter uploads HTML report
      ],
    });
  });
});
