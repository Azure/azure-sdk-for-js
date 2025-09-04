const { createAzurePlaywrightConfig } = require("@azure/playwright");
const { defineConfig } = require('@playwright/test');
const { DefaultAzureCredential } = require("@azure/identity");
const config = require("./playwright.config");

export default defineConfig(config, createAzurePlaywrightConfig(config, {
  credential: new DefaultAzureCredential()
}));
