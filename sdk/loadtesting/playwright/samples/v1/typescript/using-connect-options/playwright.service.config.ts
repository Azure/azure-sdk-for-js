import { getServiceConfig } from "@azure/playwright";
import { defineConfig } from "@playwright/test";
import config from "./playwright.config.js";

export default defineConfig(config, getServiceConfig(config));
