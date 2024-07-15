import { getServiceConfig, ServiceOsConstants } from "@azure/microsoft-playwright-testing";
import { defineConfig } from "@playwright/test";
import config from "./playwright.config";
import { AzureCliCredential } from "@azure/identity";

export default defineConfig(
  config,
  getServiceConfig(config, {
    os: ServiceOsConstants.WINDOWS,
    runId: new Date().toISOString(),
    credential: new AzureCliCredential(),
  }),
  {
    reporter: [
      ["list"],
      [
        "@azure/microsoft-playwright-testing/reporter",
        {
          enableGitHubSummary: false,
        },
      ],
    ],
  },
);
