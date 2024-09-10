const { getServiceConfig, ServiceAuth } = require("@azure/microsoft-playwright-testing");
const { defineConfig } = require('@playwright/test');
const config = require("./playwright.config");

export default defineConfig(config, getServiceConfig(config, {
  serviceAuthType: ServiceAuth.ACCESS_TOKEN
}), {
  reporter: [["list"], ["@azure/microsoft-playwright-testing/reporter"]],
});
