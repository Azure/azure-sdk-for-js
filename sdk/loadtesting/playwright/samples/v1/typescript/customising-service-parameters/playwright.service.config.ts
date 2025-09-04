import {
  createAzurePlaywrightConfig,
  ServiceOS,
  PlaywrightServiceAdditionalOptions,
  ServiceAuth,
  AuthenticationType,
  OsType,
} from "@azure/playwright";
import { defineConfig } from "@playwright/test";
import config from "./playwright.config.js";
import { AzureCliCredential } from "@azure/identity";

const azureCredential = new AzureCliCredential();

const serviceAuthType: AuthenticationType = ServiceAuth.ENTRA_ID;
const os: OsType = ServiceOS.LINUX;

const playwrightServiceAdditionalOptions: PlaywrightServiceAdditionalOptions = {
  serviceAuthType: serviceAuthType, // Authentication types supported by Azure Playwright
  os: os, // Operating system types supported by Azure Playwright
  connectTimeout: 30000, // Maximum time in milliseconds to wait for the connection to be established
  slowMo: 0, // Slows down Playwright operations by the specified amount of milliseconds
  exposeNetwork: "<loopback>", // Exposes network available on the connecting client to the browser being connected to
  credential: azureCredential, // Custom token credential for Entra ID authentication
  runName: "Typescript V1 - Sample Run", // Run name for the test run
};

export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, playwrightServiceAdditionalOptions),
);
