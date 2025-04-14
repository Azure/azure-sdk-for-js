const { getServiceConfig } = require("@azure/microsoft-playwright-testing");
const { defineConfig } = require('@playwright/test');
const config = require("./playwright.config");

export default defineConfig(config, getServiceConfig(config), {
  reporter: [["list"], ["@azure/microsoft-playwright-testing/reporter"]],
});
