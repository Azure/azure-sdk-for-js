import { getServiceConfig } from "@azure/microsoft-playwright-testing";
import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

export default defineConfig(
  config,
  getServiceConfig(config, {
    useCloudHostedBrowsers: false,
  }),
  {
    reporter: [["list"], ["../../../../src/reporter/mptReporter.ts"]],
  },
);
