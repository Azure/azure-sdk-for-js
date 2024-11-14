import { getServiceConfig } from "@azure/microsoft-playwright-testing";
import { defineConfig } from "@playwright/test";
import config from "./playwright.config";
export default defineConfig(
  config,
  getServiceConfig(config, {
    serviceAuthType: "ACCESS_TOKEN",
    useCloudHostedBrowsers: true,
    runName: "hiiqwe/#243",
    runId: new Date().toISOString(),
  }),
  {
    reporter: [["list"], ["@azure/microsoft-playwright-testing/reporter"]],
  },
);
