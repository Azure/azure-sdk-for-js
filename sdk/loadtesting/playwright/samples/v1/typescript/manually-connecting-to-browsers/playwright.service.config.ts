import { getServiceConfig } from "@azure/playwright";
import { defineConfig } from "@playwright/test";
import { DefaultAzureCredential } from "@azure/identity";
import config from "./playwright.config.js";

export default defineConfig(
  config,
  getServiceConfig(config, {
    credential: new DefaultAzureCredential(),
  }),
);
