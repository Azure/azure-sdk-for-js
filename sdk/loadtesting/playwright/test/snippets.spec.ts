// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";

// <snippet_configure_reporters>
import { createAzurePlaywrightConfig } from "@azure/playwright";
import { defineConfig } from "@playwright/test";
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential();

// Your existing playwright config
const playwrightConfig = defineConfig({});

const azureConfig = defineConfig(
  playwrightConfig,
  createAzurePlaywrightConfig(playwrightConfig, { credential }),
  {
    reporter: [
      ["html", { open: "never" }], // HTML reporter must come first
      ["@azure/playwright/reporter"], // Azure reporter uploads HTML report
    ],
  },
);
// </snippet_configure_reporters>

describe("snippets", () => {
  it("configure_reporters", () => {
    void azureConfig;
  });
});
