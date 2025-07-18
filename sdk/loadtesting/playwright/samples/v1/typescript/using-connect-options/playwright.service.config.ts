import { getServiceConfig } from "@azure/playwright";
import { defineConfig } from "@playwright/test";
import { DefaultAzureCredential } from "@azure/identity";
import config from "./playwright.config.js";

const credential = new DefaultAzureCredential();

export default defineConfig(
  config,
  getServiceConfig(config, {
    credential,
  }),
);
