// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InternalEnvironmentVariables, ServiceAuth } from "../common/constants.js";
import customerConfig from "../common/customerConfig.js";
import { PlaywrightServiceConfig } from "../common/playwrightServiceConfig.js";
import playwrightServiceEntra from "./playwrightServiceEntra.js";
import type { PlaywrightServiceAdditionalOptions, BrowserConnectOptions } from "../common/types.js";
import {
  emitReportingUrl,
  fetchOrValidateAccessToken,
  getAccessToken,
  getServiceWSEndpoint,
  validateMptPAT,
  warnIfAccessTokenCloseToExpiry,
  validatePlaywrightVersion,
  validateServiceUrl,
  exitWithFailureMessage,
  getPackageVersion,
  getPlaywrightVersion,
  getVersionInfo,
} from "../utils/utils.js";
import { ServiceErrorMessageConstants } from "../common/messages.js";
import type { PlaywrightTestConfig } from "@playwright/test";
import { globalSetupPath, globalTeardownPath } from "./playwrightServiceUtils.js";

const performOneTimeOperation = (options?: PlaywrightServiceAdditionalOptions): void => {
  const oneTimeOperationFlag =
    process.env[InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG] === "true";
  if (oneTimeOperationFlag) return;
  process.env[InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG] = "true";
  if (options?.serviceAuthType === ServiceAuth.ACCESS_TOKEN) {
    warnIfAccessTokenCloseToExpiry();
  }
};
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
  config: PlaywrightTestConfig,
  options?: PlaywrightServiceAdditionalOptions,
): PlaywrightTestConfig => {
  validatePlaywrightVersion();
  validateServiceUrl();
  const playwrightVersionInfo = getVersionInfo(getPlaywrightVersion());
  const isMultipleGlobalFileSupported =
    playwrightVersionInfo.major >= 1 && playwrightVersionInfo.minor >= 49;
  if (options?.credential) {
    playwrightServiceEntra.entraIdAccessToken = options.credential;
  }

  // if global setup/teardown is string -
  // 1. if multiple global file is supported, convert it to array
  // 2. wrap playwright-service global setup/teardown with customer provided global setup/teardown

  // if global setup/teardown is array -
  // 1. if multiple global file is not supported, throw error
  // 2. append playwright-service global setup/teardown with customer provided global setup/teardown
  if (config && config.globalSetup) {
    if (typeof config.globalSetup === "string") {
      if (isMultipleGlobalFileSupported) {
        customerConfig.globalSetup = [config.globalSetup];
      } else {
        customerConfig.globalSetup = config.globalSetup;
      }
    } else {
      if (!isMultipleGlobalFileSupported) {
        throw new Error(
          ServiceErrorMessageConstants.MULTIPLE_SETUP_FILE_PLAYWRIGHT_VERSION_ERROR.message,
        );
      }
      customerConfig.globalSetup = config.globalSetup;
    }
  }

  if (config && config.globalTeardown) {
    if (typeof config.globalTeardown === "string") {
      if (isMultipleGlobalFileSupported) {
        customerConfig.globalTeardown = [config.globalTeardown];
      } else {
        customerConfig.globalTeardown = config.globalTeardown;
      }
    } else {
      if (!isMultipleGlobalFileSupported) {
        throw new Error(
          ServiceErrorMessageConstants.MULTIPLE_SETUP_FILE_PLAYWRIGHT_VERSION_ERROR.message,
        );
      }
      customerConfig.globalTeardown = config.globalTeardown;
    }
  }

  const playwrightServiceConfig = new PlaywrightServiceConfig();
  playwrightServiceConfig.setOptions(options);
  emitReportingUrl();

  const globalFunctions: any = {};

  if (options?.serviceAuthType === ServiceAuth.ACCESS_TOKEN) {
    // mpt PAT requested and set by the customer, no need to setup entra lifecycle handlers
    validateMptPAT(exitWithFailureMessage);
  } else {
    // If multiple global file is supported, append playwright-service global setup/teardown with customer provided global setup/teardown
    if (isMultipleGlobalFileSupported) {
      globalFunctions.globalSetup = [] as string[];
      globalFunctions.globalTeardown = [] as string[];
      if (customerConfig.globalSetup) {
        globalFunctions.globalSetup.push(...(customerConfig.globalSetup as string[]));
      }
      if (customerConfig.globalTeardown) {
        globalFunctions.globalTeardown.push(...(customerConfig.globalTeardown as string[]));
      }
      globalFunctions.globalSetup.push(globalSetupPath);
      globalFunctions.globalTeardown.push(globalTeardownPath);
    } else {
      // If multiple global file is not supported, wrap playwright-service global setup/teardown with customer provided global setup/teardown
      globalFunctions.globalSetup = globalSetupPath;
      globalFunctions.globalTeardown = globalTeardownPath;
    }
  }
  performOneTimeOperation(options);
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
          playwrightServiceConfig.serviceOs,
        ),
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "x-ms-package-version": `@azure/microsoft-playwright-testing/${getPackageVersion()}`,
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
      playwrightServiceConfig.serviceOs,
    ),
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-ms-package-version": `@azure/microsoft-playwright-testing/${getPackageVersion()}`,
      },
      timeout: playwrightServiceConfig.timeout,
      exposeNetwork: playwrightServiceConfig.exposeNetwork,
      slowMo: playwrightServiceConfig.slowMo,
    },
  };
};

export { getServiceConfig, getConnectOptions };
