// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DefaultConnectOptionsConstants,
  InternalEnvironmentVariables,
  ServiceAuth,
} from "../common/constants.js";
import customerConfig from "../common/customerConfig.js";
import { PlaywrightServiceConfig } from "../common/playwrightServiceConfig.js";
import playwrightServiceEntra from "./playwrightServiceEntra.js";
import type { PlaywrightServiceAdditionalOptions, BrowserConnectOptions } from "../common/types.js";
import {
  fetchOrValidateAccessToken,
  getAccessToken,
  getServiceWSEndpoint,
  validateMptPAT,
  validatePlaywrightVersion,
  validateServiceUrl,
  exitWithFailureMessage,
  getPlaywrightVersion,
  getVersionInfo,
  throwErrorWithFailureMessage,
  getPackageVersion,
  warnIfAccessTokenCloseToExpiry,
} from "../utils/utils.js";
import { ServiceErrorMessageConstants } from "../common/messages.js";
import type { PlaywrightTestConfig } from "@playwright/test";
import { globalPaths } from "./playwrightServiceUtils.js";

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
 * Generate playwright configuration integrated with Azure Playwright.
 *
 * @param baseConfig - base playwright configuration
 * @param options - additional options for the service
 * @returns PlaywrightConfig
 *
 * @example
 * ```
 * import { defineConfig } from "playwright/test";
 * import { createAzurePlaywrightConfig } from "@azure/playwright";
 * import playwrightConfig from "./playwright.config";
 *
 * export default defineConfig(playwrightConfig, createAzurePlaywrightConfig(playwrightConfig));
 * ```
 *
 * @example
 * ```
 * import { defineConfig } from "playwright/test";
 * import { createAzurePlaywrightConfig, ServiceOS, ServiceAuth } from "@azure/playwright";
 * import playwrightConfig from "./playwright.config";
 * import { DefaultAzureCredential } from '@azure/identity';
 *
 * export default defineConfig(playwrightConfig, createAzurePlaywrightConfig(playwrightConfig, {
 *  credential: new DefaultAzureCredential(),
 *  serviceAuthType: ServiceAuth.ENTRA_ID,
 *  os: ServiceOS.WINDOWS
 * }));
 * ```
 */
const createAzurePlaywrightConfig = (
  baseConfig: PlaywrightTestConfig,
  options?: PlaywrightServiceAdditionalOptions,
): PlaywrightTestConfig => {
  validatePlaywrightVersion();
  validateServiceUrl();

  // Set environment variable to indicate user is using service config
  process.env[InternalEnvironmentVariables.USING_SERVICE_CONFIG] = "true";
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
  if (baseConfig && baseConfig.globalSetup) {
    if (typeof baseConfig.globalSetup === "string") {
      if (isMultipleGlobalFileSupported) {
        customerConfig.globalSetup = [baseConfig.globalSetup];
      } else {
        customerConfig.globalSetup = baseConfig.globalSetup;
      }
    } else {
      if (!isMultipleGlobalFileSupported) {
        throw new Error(
          ServiceErrorMessageConstants.MULTIPLE_SETUP_FILE_PLAYWRIGHT_VERSION_ERROR.message,
        );
      }
      customerConfig.globalSetup = baseConfig.globalSetup;
    }
  }

  if (baseConfig && baseConfig.globalTeardown) {
    if (typeof baseConfig.globalTeardown === "string") {
      if (isMultipleGlobalFileSupported) {
        customerConfig.globalTeardown = [baseConfig.globalTeardown];
      } else {
        customerConfig.globalTeardown = baseConfig.globalTeardown;
      }
    } else {
      if (!isMultipleGlobalFileSupported) {
        throw new Error(
          ServiceErrorMessageConstants.MULTIPLE_SETUP_FILE_PLAYWRIGHT_VERSION_ERROR.message,
        );
      }
      customerConfig.globalTeardown = baseConfig.globalTeardown;
    }
  }

  const playwrightServiceConfig = PlaywrightServiceConfig.instance;
  playwrightServiceConfig.setOptions(options);
  playwrightServiceConfig.serviceAuthType =
    options?.serviceAuthType || DefaultConnectOptionsConstants.DEFAULT_SERVICE_AUTH_TYPE;

  const globalFunctions: any = {};

  if (options?.serviceAuthType === ServiceAuth.ACCESS_TOKEN) {
    // mpt PAT requested and set by the customer, no need to setup entra lifecycle handlers
    validateMptPAT(exitWithFailureMessage);
  }
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
    globalFunctions.globalSetup.push(globalPaths.setup);
    globalFunctions.globalTeardown.push(globalPaths.teardown);
  } else {
    // If multiple global file is not supported, wrap playwright-service global setup/teardown with customer provided global setup/teardown
    globalFunctions.globalSetup = globalPaths.setup;
    globalFunctions.globalTeardown = globalPaths.teardown;
  }

  performOneTimeOperation(options);

  if (!process.env[InternalEnvironmentVariables.MPT_CLOUD_HOSTED_BROWSER_USED]) {
    process.env[InternalEnvironmentVariables.MPT_CLOUD_HOSTED_BROWSER_USED] = "true";
    console.log("\nRunning tests using Playwright workspaces.");
  }

  return {
    use: {
      connectOptions: {
        wsEndpoint: getServiceWSEndpoint(
          playwrightServiceConfig.runId,
          playwrightServiceConfig.serviceOs,
          playwrightServiceConfig.apiVersion,
        ),
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "x-ms-package-version": `@azure/playwright/${getPackageVersion()}`,
        },
        timeout: playwrightServiceConfig.connectTimeout,
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
 * Get connect options required to connect to Azure Playwright's cloud hosted browsers.
 *
 * @param options - additional options for the service
 * @returns BrowserConnectOptions
 *
 * @example
 * ```
 * import playwright, { test, expect, BrowserType } from "@playwright/test";
 * import { getConnectOptions } from "@azure/playwright";
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
  options?: PlaywrightServiceAdditionalOptions,
): Promise<BrowserConnectOptions> => {
  const playwrightServiceConfig = PlaywrightServiceConfig.instance;

  playwrightServiceConfig.setOptions(options, true);
  performOneTimeOperation(options);
  playwrightServiceConfig.serviceAuthType =
    options?.serviceAuthType || DefaultConnectOptionsConstants.DEFAULT_SERVICE_AUTH_TYPE;

  let token: string | undefined;
  if (playwrightServiceConfig.serviceAuthType === ServiceAuth.ENTRA_ID) {
    if (!options?.credential) {
      throw new Error(ServiceErrorMessageConstants.NO_CRED_ENTRA_AUTH_ERROR.message);
    }
    playwrightServiceEntra.entraIdAccessToken = options.credential;
    token = await fetchOrValidateAccessToken(options.credential);
  } else if (playwrightServiceConfig.serviceAuthType === ServiceAuth.ACCESS_TOKEN) {
    validateMptPAT(throwErrorWithFailureMessage);
    token = getAccessToken();
  } else {
    throw new Error(ServiceErrorMessageConstants.INVALID_AUTH_TYPE_ERROR.message);
  }

  if (!token) {
    throw new Error(ServiceErrorMessageConstants.NO_AUTH_ERROR.message);
  }

  return {
    wsEndpoint: getServiceWSEndpoint(
      playwrightServiceConfig.runId,
      playwrightServiceConfig.serviceOs,
      playwrightServiceConfig.apiVersion,
    ),
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-ms-package-version": `@azure/playwright/${getPackageVersion()}`,
      },
      timeout: playwrightServiceConfig.connectTimeout,
      exposeNetwork: playwrightServiceConfig.exposeNetwork,
      slowMo: playwrightServiceConfig.slowMo,
    },
  };
};

export { createAzurePlaywrightConfig, getConnectOptions };
