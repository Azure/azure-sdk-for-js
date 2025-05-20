const { getServiceConfig } = require("@azure/playwright");
const { defineConfig } = require('@playwright/test');
const config = require("./playwright.config");

export default defineConfig(config, getServiceConfig(config));
