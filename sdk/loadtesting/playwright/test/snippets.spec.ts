import { describe, it, assert } from "vitest";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

describe("snippets", () => {
  it("configure_reporters", () => {
    // <snippet_configure_reporters>
    import { getServiceConfig, PlaywrightReporter } from "@azure/playwright";
    import { defineConfig } from "@playwright/test";
    import { DefaultAzureCredential } from "@azure/identity";

    export default defineConfig(
      getServiceConfig({
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
