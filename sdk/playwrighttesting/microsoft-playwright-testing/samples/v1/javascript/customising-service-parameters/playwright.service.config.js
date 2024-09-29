const { AzureCliCredential } = require("@azure/identity");
const { getServiceConfig, ServiceOS } = require("@azure/microsoft-playwright-testing");
const { defineConfig } = require('@playwright/test');
const config = require("./playwright.config");

export default defineConfig(
  config,
  getServiceConfig(config, {
    os: ServiceOS.WINDOWS,
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
