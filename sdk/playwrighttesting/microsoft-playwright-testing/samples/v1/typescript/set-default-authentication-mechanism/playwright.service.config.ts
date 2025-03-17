import {
  getServiceConfig,
  ServiceAuth,
  ServiceEnvironmentVariable,
} from "@azure/microsoft-playwright-testing";
import { defineConfig } from "@playwright/test";
import config from "./playwright.config.js";

// You can get the below values from the MPT portal. Alternatively you can directly set the environment variables PLAYWRIGHT_SERVICE_URL & PLAYWRIGHT_SERVICE_ACCESS_TOKEN
process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] = "Remote Browser URL";
process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "***Access Token***";

export default defineConfig(
  config,
  getServiceConfig(config, {
    serviceAuthType: ServiceAuth.ACCESS_TOKEN,
  }),
  {
    reporter: [["list"], ["@azure/microsoft-playwright-testing/reporter"]],
  },
);
