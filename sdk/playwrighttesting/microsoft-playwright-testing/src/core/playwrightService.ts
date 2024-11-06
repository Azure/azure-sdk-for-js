// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InternalEnvironmentVariables, ServiceAuth } from "../common/constants";
import customerConfig from "../common/customerConfig";
import { PlaywrightServiceConfig } from "../common/playwrightServiceConfig";
import playwrightServiceEntra from "./playwrightServiceEntra";
import type {
  PlaywrightServiceAdditionalOptions,
  PlaywrightConfig,
  PlaywrightConfigInput,
  BrowserConnectOptions,
} from "../common/types";
import {
  emitReportingUrl,
  fetchOrValidateAccessToken,
  getAccessToken,
  getServiceWSEndpoint,
  validateMptPAT,
  validatePlaywrightVersion,
  validateServiceUrl,
  exitWithFailureMessage,
} from "../utils/utils";

/**
 * @public
 *
 * Generate playwright configuration integrated with Microsoft Playwright Testing.
 *
 * @param config - base playwright configuration
 * @param options - additional options for the service
 * @returns PlaywrightConfig
 *
 * @example
 * ```
 * import { defineConfig } from "playwright/test";
 * import { getServiceConfig } from "@azure/microsoft-playwright-testing";
 * import playwrightConfig from "./playwright.config";
 *
 * export default defineConfig(playwrightConfig, getServiceConfig(playwrightConfig));
 * ```
 *
 * @example
 * ```
 * import { defineConfig } from "playwright/test";
 * import { getServiceConfig, ServiceOS } from "@azure/microsoft-playwright-testing";
 * import playwrightConfig from "./playwright.config";
 *
 * export default defineConfig(playwrightConfig, getServiceConfig(playwrightConfig, {
 *  runId: "custom run id",
 *  os: ServiceOS.WINDOWS
 * }));
 * ```
 */
const getServiceConfig = (
  config: PlaywrightConfigInput,
  options?: PlaywrightServiceAdditionalOptions,
): PlaywrightConfig => {
  validatePlaywrightVersion();
  validateServiceUrl();
  if (options?.credential) {
    playwrightServiceEntra.entraIdAccessToken = options.credential;
  }
  if (config.globalSetup) {
    customerConfig.globalSetup = config.globalSetup;
  }
  if (config.globalTeardown) {
    customerConfig.globalTeardown = config.globalTeardown;
  }

  const playwrightServiceConfig = new PlaywrightServiceConfig();
  playwrightServiceConfig.setOptions(options);
  emitReportingUrl();

  const globalFunctions: any = {};
  if (options?.serviceAuthType === ServiceAuth.ACCESS_TOKEN) {
    // mpt PAT requested and set by the customer, no need to setup entra lifecycle handlers
    validateMptPAT(exitWithFailureMessage);
  } else {
    globalFunctions.globalSetup = require.resolve("./global/playwright-service-global-setup");
    globalFunctions.globalTeardown = require.resolve("./global/playwright-service-global-teardown");
  }

  if (options?.useCloudHostedBrowsers === false) {
    return {
      ...globalFunctions,
    };
  }
  if (!process.env[InternalEnvironmentVariables.MPT_CLOUD_HOSTED_BROWSER_USED]) {
    process.env[InternalEnvironmentVariables.MPT_CLOUD_HOSTED_BROWSER_USED] = "true";
    console.log("\nRunning tests using Microsoft Playwright Testing service.");
  }

  return {
    use: {
      connectOptions: {
        wsEndpoint: getServiceWSEndpoint(
          playwrightServiceConfig.runId,
          playwrightServiceConfig.runName,
          playwrightServiceConfig.serviceOs,
        ),
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        timeout: playwrightServiceConfig.timeout,
        exposeNetwork: playwrightServiceConfig.exposeNetwork,
        slowMo: playwrightServiceConfig.slowMo,
      },
    },
    ...globalFunctions,
  };
};

/**
 * @public
 *
 * Get connect options required to connect to Microsoft Playwright Testing's cloud hosted browsers.
 *
 * @param options - additional options for the service
 * @returns BrowserConnectOptions
 *
 * @example
 * ```
 * import playwright, { test, expect, BrowserType } from "@playwright/test";
 * import { getConnectOptions } from "@azure/microsoft-playwright-testing";
 *
 * test('has title', async ({ browserName }) => {
 *  const { wsEndpoint, options } = await getConnectOptions();
 *  const browser = await (playwright[browserName] as BrowserType).connect(wsEndpoint, options);
 *  const context = await browser.newContext();
 *  const page = await context.newPage();
 *
 *  await page.goto('https://playwright.dev/');
 *  await expect(page).toHaveTitle(/Playwright/);
 *
 *  await page.close();
 *  await context.close();
 *  await browser.close();
 * });
 * ```
 */
const getConnectOptions = async (
  options?: Omit<PlaywrightServiceAdditionalOptions, "serviceAuthType">,
): Promise<BrowserConnectOptions> => {
  const playwrightServiceConfig = new PlaywrightServiceConfig();
  playwrightServiceConfig.setOptions(options);

  const token = await fetchOrValidateAccessToken(options?.credential);
  return {
    wsEndpoint: getServiceWSEndpoint(
      playwrightServiceConfig.runId,
      playwrightServiceConfig.runName,
      playwrightServiceConfig.serviceOs,
    ),
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: playwrightServiceConfig.timeout,
      exposeNetwork: playwrightServiceConfig.exposeNetwork,
      slowMo: playwrightServiceConfig.slowMo,
    },
  };
};

export { getServiceConfig, getConnectOptions };
