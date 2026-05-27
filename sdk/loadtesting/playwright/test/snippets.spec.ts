// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { createAzurePlaywrightConfig } from "../src/index.js";
import { defineConfig } from "@playwright/test";
import { DefaultAzureCredential } from "@azure/identity";

describe("snippets", () => {
  it("configure_reporters", () => {
    // <snippet_configure_reporters>
    const playwrightConfig = defineConfig({});

    defineConfig(
      playwrightConfig,
      createAzurePlaywrightConfig(playwrightConfig, {
        // Your existing configuration
        credential: new DefaultAzureCredential(),
      }),
      {
        reporter: [
          ["html", { open: "never" }], // HTML reporter must come first
          ["@azure/playwright/reporter"], // Azure reporter uploads HTML report
        ],
      },
    );
    // </snippet_configure_reporters>
  });
});
