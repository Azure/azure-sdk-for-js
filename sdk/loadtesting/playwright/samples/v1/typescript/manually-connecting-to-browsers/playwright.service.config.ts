import { getServiceConfig } from "@azure/playwright";
import { defineConfig } from "@playwright/test";
import { DefaultAzureCredential } from "@azure/identity";
import config from "./playwright.config.js";

export default defineConfig(
  config,
  getServiceConfig(config, {
    serviceAuthType: "ACCESS_TOKEN",
    credential: new DefaultAzureCredential(),
  }),
);
