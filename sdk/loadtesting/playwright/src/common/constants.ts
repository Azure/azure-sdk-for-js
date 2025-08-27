// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const EntraIdAccessTokenConstants = {
  LIFETIME_LEFT_THRESHOLD_IN_MINUTES_FOR_ROTATION: 15,
  SCOPE: "https://management.core.windows.net/.default",
  ROTATION_INTERVAL_PERIOD_IN_MINUTES: 4,
};

/** @public
 *
 * OS types supported on Azure Playwright cloud hosted browsers
 */
export const ServiceOS = {
  LINUX: "linux",
  WINDOWS: "windows",
} as const;

/** @public
 *
 * Authentication types supported on Azure Playwright
 */
export const ServiceAuth = {
  ENTRA_ID: "ENTRA_ID",
  ACCESS_TOKEN: "ACCESS_TOKEN",
} as const;

/** @public
 *
 * Environment variables used by Azure Playwright
 */
export const ServiceEnvironmentVariable = {
  PLAYWRIGHT_SERVICE_ACCESS_TOKEN: "PLAYWRIGHT_SERVICE_ACCESS_TOKEN",
  PLAYWRIGHT_SERVICE_URL: "PLAYWRIGHT_SERVICE_URL",
};

export const GitHubActionsConstants = {
  GIT_VERSION_COMMAND: "git --version",
  GIT_REV_PARSE: "git rev-parse --is-inside-work-tree",
  GIT_COMMIT_MESSAGE_COMMAND: 'git log -1 --pretty=format:"%s"',
};

export const DefaultConnectOptionsConstants = {
  DEFAULT_TIMEOUT: 30000,
  DEFAULT_SLOW_MO: 0,
  DEFAULT_EXPOSE_NETWORK: "<loopback>",
  DEFAULT_SERVICE_OS: ServiceOS.LINUX,
  DEFAULT_SERVICE_AUTH_TYPE: ServiceAuth.ENTRA_ID,
};

export const SDKLanguage = {
  JAVASCRIPT: "JAVASCRIPT",
  TYPESCRIPT: "TYPESCRIPT",
  CSHARP: "CSHARP",
};

export const RunConfigConstants = {
  TEST_FRAMEWORK_NAME: "PLAYWRIGHT",
  TEST_SDK_LANGUAGE: SDKLanguage.JAVASCRIPT,
  TEST_FRAMEWORK_RUNNERNAME: "PLAYWRIGHT",
};

export const Constants = {
  SevenDaysInMS: 7 * 24 * 60 * 60 * 1000,
  OneDayInMS: 24 * 60 * 60 * 1000,
  MinimumSupportedPlaywrightVersion: "1.47.0",
  LatestAPIVersion: "2025-09-01",
  HTTP_CALL_TIMEOUT: 10000,
};

export const InternalEnvironmentVariables = {
  MPT_PLAYWRIGHT_VERSION: "_MPT_PLAYWRIGHT_VERSION",
  MPT_SETUP_FATAL_ERROR: "_MPT_SETUP_FATAL_ERROR",
  MPT_SERVICE_RUN_NAME: "_MPT_SERVICE_RUN_NAME",
  MPT_API_VERSION: "_MPT_API_VERSION",
  MPT_SERVICE_RUN_ID: "_MPT_SERVICE_RUN_ID",
  MPT_CLOUD_HOSTED_BROWSER_USED: "_MPT_CLOUD_HOSTED_BROWSER_USED",
  MPT_SERVICE_OS: "_MPT_SERVICE_OS",
  ONE_TIME_OPERATION_FLAG: "_ONE_TIME_OPERATION_FLAG",
  USING_SERVICE_CONFIG: "_USING_SERVICE_CONFIG",
};
