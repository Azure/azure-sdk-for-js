const { getServiceConfig } = require("@azure/playwright");
const { defineConfig } = require('@playwright/test');
const { DefaultAzureCredential } = require("@azure/identity");
const config = require("./playwright.config");

export default defineConfig(config, getServiceConfig(config, {
    credential: new DefaultAzureCredential()
}));
