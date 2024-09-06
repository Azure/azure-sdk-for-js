import { getServiceConfig, ServiceAuth } from "@azure/microsoft-playwright-testing";
import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

export default defineConfig(
  config,
  getServiceConfig(config, {
    serviceAuthType: ServiceAuth.ACCESS_TOKEN,
  }),
  {
    reporter: [["list"], ["@azure/microsoft-playwright-testing/reporter"]],
  },
);
