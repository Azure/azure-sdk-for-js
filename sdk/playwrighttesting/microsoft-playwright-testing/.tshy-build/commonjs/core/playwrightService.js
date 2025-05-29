"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectOptions = exports.getServiceConfig = void 0;
const tslib_1 = require("tslib");
const constants_js_1 = require("../common/constants.js");
const customerConfig_js_1 = tslib_1.__importDefault(require("../common/customerConfig.js"));
const playwrightServiceConfig_js_1 = require("../common/playwrightServiceConfig.js");
const playwrightServiceEntra_js_1 = tslib_1.__importDefault(require("./playwrightServiceEntra.js"));
const utils_js_1 = require("../utils/utils.js");
const messages_js_1 = require("../common/messages.js");
const playwrightServiceUtils_js_1 = require("./playwrightServiceUtils.js");
const performOneTimeOperation = (options) => {
    const oneTimeOperationFlag = process.env[constants_js_1.InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG] === "true";
    if (oneTimeOperationFlag)
        return;
    process.env[constants_js_1.InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG] = "true";
    if ((options === null || options === void 0 ? void 0 : options.serviceAuthType) === constants_js_1.ServiceAuth.ACCESS_TOKEN) {
        (0, utils_js_1.warnIfAccessTokenCloseToExpiry)();
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
const getServiceConfig = (config, options) => {
    (0, utils_js_1.validatePlaywrightVersion)();
    (0, utils_js_1.validateServiceUrl)();
    const playwrightVersionInfo = (0, utils_js_1.getVersionInfo)((0, utils_js_1.getPlaywrightVersion)());
    const isMultipleGlobalFileSupported = playwrightVersionInfo.major >= 1 && playwrightVersionInfo.minor >= 49;
    if (options === null || options === void 0 ? void 0 : options.credential) {
        playwrightServiceEntra_js_1.default.entraIdAccessToken = options.credential;
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
                customerConfig_js_1.default.globalSetup = [config.globalSetup];
            }
            else {
                customerConfig_js_1.default.globalSetup = config.globalSetup;
            }
        }
        else {
            if (!isMultipleGlobalFileSupported) {
                throw new Error(messages_js_1.ServiceErrorMessageConstants.MULTIPLE_SETUP_FILE_PLAYWRIGHT_VERSION_ERROR.message);
            }
            customerConfig_js_1.default.globalSetup = config.globalSetup;
        }
    }
    if (config && config.globalTeardown) {
        if (typeof config.globalTeardown === "string") {
            if (isMultipleGlobalFileSupported) {
                customerConfig_js_1.default.globalTeardown = [config.globalTeardown];
            }
            else {
                customerConfig_js_1.default.globalTeardown = config.globalTeardown;
            }
        }
        else {
            if (!isMultipleGlobalFileSupported) {
                throw new Error(messages_js_1.ServiceErrorMessageConstants.MULTIPLE_SETUP_FILE_PLAYWRIGHT_VERSION_ERROR.message);
            }
            customerConfig_js_1.default.globalTeardown = config.globalTeardown;
        }
    }
    const playwrightServiceConfig = new playwrightServiceConfig_js_1.PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions(options);
    (0, utils_js_1.emitReportingUrl)();
    const globalFunctions = {};
    if ((options === null || options === void 0 ? void 0 : options.serviceAuthType) === constants_js_1.ServiceAuth.ACCESS_TOKEN) {
        // mpt PAT requested and set by the customer, no need to setup entra lifecycle handlers
        (0, utils_js_1.validateMptPAT)(utils_js_1.exitWithFailureMessage);
    }
    else {
        // If multiple global file is supported, append playwright-service global setup/teardown with customer provided global setup/teardown
        if (isMultipleGlobalFileSupported) {
            globalFunctions.globalSetup = [];
            globalFunctions.globalTeardown = [];
            if (customerConfig_js_1.default.globalSetup) {
                globalFunctions.globalSetup.push(...customerConfig_js_1.default.globalSetup);
            }
            if (customerConfig_js_1.default.globalTeardown) {
                globalFunctions.globalTeardown.push(...customerConfig_js_1.default.globalTeardown);
            }
            globalFunctions.globalSetup.push(playwrightServiceUtils_js_1.globalSetupPath);
            globalFunctions.globalTeardown.push(playwrightServiceUtils_js_1.globalTeardownPath);
        }
        else {
            // If multiple global file is not supported, wrap playwright-service global setup/teardown with customer provided global setup/teardown
            globalFunctions.globalSetup = playwrightServiceUtils_js_1.globalSetupPath;
            globalFunctions.globalTeardown = playwrightServiceUtils_js_1.globalTeardownPath;
        }
    }
    performOneTimeOperation(options);
    if ((options === null || options === void 0 ? void 0 : options.useCloudHostedBrowsers) === false) {
        return Object.assign({}, globalFunctions);
    }
    if (!process.env[constants_js_1.InternalEnvironmentVariables.MPT_CLOUD_HOSTED_BROWSER_USED]) {
        process.env[constants_js_1.InternalEnvironmentVariables.MPT_CLOUD_HOSTED_BROWSER_USED] = "true";
        console.log("\nRunning tests using Microsoft Playwright Testing service.");
    }
    return Object.assign({ use: {
            connectOptions: {
                wsEndpoint: (0, utils_js_1.getServiceWSEndpoint)(playwrightServiceConfig.runId, playwrightServiceConfig.serviceOs),
                headers: {
                    Authorization: `Bearer ${(0, utils_js_1.getAccessToken)()}`,
                    "x-ms-package-version": `@azure/microsoft-playwright-testing/${(0, utils_js_1.getPackageVersion)()}`,
                },
                timeout: playwrightServiceConfig.timeout,
                exposeNetwork: playwrightServiceConfig.exposeNetwork,
                slowMo: playwrightServiceConfig.slowMo,
            },
        } }, globalFunctions);
};
exports.getServiceConfig = getServiceConfig;
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
const getConnectOptions = async (options) => {
    const playwrightServiceConfig = new playwrightServiceConfig_js_1.PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions(options);
    const token = await (0, utils_js_1.fetchOrValidateAccessToken)(options === null || options === void 0 ? void 0 : options.credential);
    return {
        wsEndpoint: (0, utils_js_1.getServiceWSEndpoint)(playwrightServiceConfig.runId, playwrightServiceConfig.serviceOs),
        options: {
            headers: {
                Authorization: `Bearer ${token}`,
                "x-ms-package-version": `@azure/microsoft-playwright-testing/${(0, utils_js_1.getPackageVersion)()}`,
            },
            timeout: playwrightServiceConfig.timeout,
            exposeNetwork: playwrightServiceConfig.exposeNetwork,
            slowMo: playwrightServiceConfig.slowMo,
        },
    };
};
exports.getConnectOptions = getConnectOptions;
//# sourceMappingURL=playwrightService.js.map