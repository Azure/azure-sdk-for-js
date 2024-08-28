import { getServiceConfig, Auth } from "@azure/microsoft-playwright-testing";
import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

export default defineConfig(
  config,
  getServiceConfig(config, {
    defaultAuth: ServiceAuth.TOKEN,
  }),
  {
    reporter: [["list"], ["@azure/microsoft-playwright-testing/reporter"]],
  },
);
