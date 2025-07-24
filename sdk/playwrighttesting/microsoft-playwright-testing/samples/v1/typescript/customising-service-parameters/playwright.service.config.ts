import {
  getServiceConfig,
  ServiceOS,
  PlaywrightServiceAdditionalOptions,
  ServiceAuth,
  AuthenticationType,
  OsType,
  ReporterConfiguration,
} from "@azure/microsoft-playwright-testing";
import { defineConfig } from "@playwright/test";
import config from "./playwright.config.js";
import { AzureCliCredential } from "@azure/identity";

const azureCredential = new AzureCliCredential();

const serviceAuthType: AuthenticationType = ServiceAuth.ENTRA_ID;
const os: OsType = ServiceOS.LINUX;

const playwrightServiceAdditionalOptions: PlaywrightServiceAdditionalOptions = {
  serviceAuthType: serviceAuthType, // Authentication types supported by Microsoft Playwright Testing
  os: os, // Operating system types supported by Microsoft Playwright Testing
  runId: new Date().toISOString(), // Run id for the test run
  timeout: 30000, // Maximum time in milliseconds to wait for the connection to be established
  slowMo: 0, // Slows down Playwright operations by the specified amount of milliseconds
  exposeNetwork: "<loopback>", // Exposes network available on the connecting client to the browser being connected to
  useCloudHostedBrowsers: true, // Use cloud hosted browsers
  credential: azureCredential, // Custom token credential for Entra ID authentication
  runName: "Typescript V1 - Sample Run", // Run name for the test run
};

const reporterConfiguration: ReporterConfiguration = {
  enableGitHubSummary: true, // Enable GitHub Actions annotations to diagnose test failures and deep link to MPT Portal
  enableResultPublish: true, // Enable result publishing for the test run. This will upload the test result and artifacts to the MPT Portal
};

export default defineConfig(config, getServiceConfig(config, playwrightServiceAdditionalOptions), {
  reporter: [["list"], ["@azure/microsoft-playwright-testing/reporter", reporterConfiguration]],
});
