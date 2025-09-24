import { createAzurePlaywrightConfig, ServiceAuth, ServiceEnvironmentVariable } from "@azure/playwright";
import { defineConfig } from '@playwright/test';
import config from "./playwright.config.js";

// You can get the below values from the MPT portal. Alternatively you can directly set the environment variables PLAYWRIGHT_SERVICE_URL & PLAYWRIGHT_SERVICE_ACCESS_TOKEN
process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] = "Remote Browser URL";
process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "***Access Token***";


export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    serviceAuthType: ServiceAuth.ACCESS_TOKEN
  })
);
