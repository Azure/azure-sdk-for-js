const { getServiceConfig, Auth } = require("@azure/microsoft-playwright-testing");
const { defineConfig } = require('@playwright/test');
const config = require("./playwright.config");

export default defineConfig(config, getServiceConfig(config, {
  defaultAuth: Auth.TOKEN
}), {
  reporter: [["list"], ["@azure/microsoft-playwright-testing/reporter"]],
});
