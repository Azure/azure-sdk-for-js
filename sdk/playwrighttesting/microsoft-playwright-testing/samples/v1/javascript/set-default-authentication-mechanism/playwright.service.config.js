const { getServiceConfig, ServiceAuthenticationConstants } = require("@azure/microsoft-playwright-testing");
const { defineConfig } = require('@playwright/test');
const config = require("./playwright.config");

export default defineConfig(config, getServiceConfig(config, {
  defaultAuth: ServiceAuthenticationConstants.SERVICE_TOKEN
}), {
  reporter: [["list"], ["@azure/microsoft-playwright-testing/reporter"]],
});
