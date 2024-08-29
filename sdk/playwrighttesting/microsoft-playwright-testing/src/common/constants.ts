// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const EntraIdAccessTokenConstants = {
  LIFETIME_LEFT_THRESHOLD_IN_MINUTES_FOR_ROTATION: 15,
  SCOPE: "https://management.core.windows.net/.default",
  ROTATION_INTERVAL_PERIOD_IN_MINUTES: 4,
};

/** @public
 *
 * OS types supported on Microsoft Playwright Testing cloud hosted browsers
 */
export const ServiceOS = {
  LINUX: "linux",
  WINDOWS: "windows",
} as const;

/** @public
 *
 * Authentication types supported on Microsoft Playwright Testing
 */
export const ServiceAuth = {
  ENTRA: "ENTRA",
  TOKEN: "TOKEN",
} as const;

/** @public
 *
 * Environment variables used by Microsoft Playwright Testing
 */
export const ServiceEnvironmentVariable = {
  PLAYWRIGHT_SERVICE_OS: "PLAYWRIGHT_SERVICE_OS",
  PLAYWRIGHT_SERVICE_RUN_ID: "PLAYWRIGHT_SERVICE_RUN_ID",
  PLAYWRIGHT_SERVICE_EXPOSE_NETWORK_ENVIRONMENT_VARIABLE: "PLAYWRIGHT_SERVICE_EXPOSE_NETWORK",
  PLAYWRIGHT_SERVICE_ACCESS_TOKEN: "PLAYWRIGHT_SERVICE_ACCESS_TOKEN",
  PLAYWRIGHT_SERVICE_URL: "PLAYWRIGHT_SERVICE_URL",
  PLAYWRIGHT_SERVICE_REPORTING_URL: "PLAYWRIGHT_SERVICE_REPORTING_URL",
};

export const InternalServiceEnvironmentVariable = {
  PLAYWRIGHT_SERVICE_CLOUD_HOSTED_BROWSER_USED: "_PLAYWRIGHT_SERVICE_CLOUD_HOSTED_BROWSER_USED",
};

export const DefaultConnectOptionsConstants = {
  DEFAULT_TIMEOUT: 0,
  DEFAULT_SLOW_MO: 0,
  DEFAULT_EXPOSE_NETWORK: "<loopback>",
  DEFAULT_SERVICE_OS: ServiceOS.LINUX,
};

export const API_VERSION = "2023-10-01-preview";

// Do not put an ending slash for the urls,
// for example use https://www.microsoft.com/en-in and not https://www.microsoft.com/en-in/

export class Constants {
  // Config related constants
  public static readonly TEST_FRAMEWORK_NAME = "Playwright";
  public static readonly TEST_FRAMEWORK_RUNNERNAME = "Playwright Test Runner";
  public static readonly TEST_TYPE = "WebTest";
  public static readonly TEST_SDK_LANGUAGE = "JavaScript/TypeScript";
  // Placeholder version
  public static readonly REPORTER_PACKAGE_VERSION = "1.0.0-beta.1";
  public static readonly DEFAULT_DASHBOARD_ENDPOINT = "https://playwright.microsoft.com";
  public static readonly DEFAULT_SERVICE_ENDPOINT =
    "https://{region}.reporting.api.playwright-test.io";
  public static readonly DEFAULT_REDACTED_MESSAGE = "***REDACTED***";
  public static readonly SAS_URI_SEPARATOR = "?";
  public static readonly DEFAULT_TEST_RUN_NAME = "MPTReporterTests";
  public static readonly TEST_BATCH_SIZE = 50;
  public static readonly UPLOAD_MODE = "sdk";
  public static readonly GIT_VERSION_COMMAND = "git --version";
  public static readonly GIT_REV_PARSE = "git rev-parse --is-inside-work-tree";
  public static readonly GIT_COMMIT_MESSAGE_COMMAND = 'git log -1 --pretty=format:"%s"';
  public static readonly ERROR_MESSAGES_MAX_LENGTH = 100;
  public static readonly API_VERSION = "2024-05-20-preview";
  public static readonly NON_RETRYABLE_STATUS_CODES = [400, 403, 404, 405, 409];
  public static readonly SupportedRegions: string[] = [
    "eastus",
    "eastasia",
    "westeurope",
    "westus3",
    "centraluseuap",
    "eastus2euap",
  ];
  // Error messages
  public static readonly CONFLICT_409_ERROR_MESSAGE =
    "Test run with id {runId} already exists. Please provide a unique run id.";
  public static readonly FORBIDDEN_403_ERROR_MESSAGE =
    "Reporting is not enabled for your workspace {workspaceId}. Please enable the Reporting feature under Feature management settings using the Playwright portal: https://playwright.microsoft.com/workspaces/{workspaceId}/settings/general";
  // API Endpoints
  public static readonly testRunsEndpoint: string = "workspaces/{workspaceId}/test-runs";
  public static readonly testRunsShardEndpoint: string =
    "workspaces/{workspaceId}/test-runs/{testRunId}/shards/{shardId}";
  public static readonly storageUriEndpoint: string =
    "workspaces/{workspaceId}/test-runs/{testRunId}/resulturi";
  public static readonly testResultsEndpoint: string =
    "workspaces/{workspaceId}/test-results/upload-batch";
}

export const BackoffConstants = {
  MAX_RETRIES: 10,
};

export const TestResultErrorConstants = [
  {
    key: "Unauthorized_Scalable",
    message:
      "Could not authenticate with the service. Please refer to https://aka.ms/mpt/authentication for more information.",
    pattern: /(?=.*browserType\.connect)(?=.*401 Unauthorized)/i,
  },
  {
    key: "NoPermissionOnWorkspace_Scalable",
    message:
      "You currently do not have permission to access the workspace ({workspaceId}). Please contact the workspace owner for access.",
    pattern:
      /(?=.*browserType\.connect)(?=.*403 Forbidden)(?=[\s\S]*CheckAccess API call with non successful response)/i,
  },
  {
    key: "InvalidWorkspace_Scalable",
    message: "The workspace ({workspaceId}) does not exist. Please provide a valid workspace url.",
    pattern:
      /(?=.*browserType\.connect)(?=.*403 Forbidden)(?=.*InvalidAccountOrSubscriptionState)/i,
  },
  {
    key: "QuotaLimitError_Scalable",
    message:
      "It is possible that the maximum number of concurrent sessions allowed for your workspace has been exceeded.",
    pattern: /Test timeout of .* exceeded|TimeoutError: browserType\.launch/i,
  },
  {
    key: "BrowserConnectionError_Scalable",
    message: "The service is currently unavailable. Please try again after some time.",
    pattern: /browserType.connect: Target page, context or browser has been closed/i,
  },
];

export const InternalEnvironmentVariables = {
  MPT_PLAYWRIGHT_VERSION: "_MPT_PLAYWRIGHT_VERSION",
};

export const MINIMUM_SUPPORTED_PLAYWRIGHT_VERSION = "1.47.0";
