// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ApiErrorMessages } from "./types";

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
  public static readonly getTestRun: string = "getTestRun";
  public static readonly patchTestRunShardStart: string = "patchTestRunShardStart";
  public static readonly patchTestRunShardEnd: string = "patchTestRunShardEnd";
  public static readonly postTestResults: string = "postTestResults";
  public static readonly getStorageUri: string = "getStorageUri";

  public static readonly ERROR_MESSAGE: ApiErrorMessages = {
    getTestRun: {
      400: "Bad Request",
      401: "Invalid authentication to run test.",
      403: "You do not have required permissions to run test.",
      500: "Unexpected server-side issue occurred."
    },
    patchTestRunShardStart: {
      400: "Bad Request",
      401: "Invalid authentication",
      403: "You do not have required permissions.",
      500: "Unexpected server-side issue occurred."
    },
    patchTestRunShardEnd: {
      400: "Bad Request",
      401: "Invalid authentication",
      403: "You do not have required permissions.",
      500: "Unexpected server-side issue occurred."
    },
    postTestResults: {
      400: "Bad Request",
      401: "Invalid authentication to publish test result.",
      403: "You do not have required permissions to publish test results to the service. Please contact your workspace administrator.",
      500: "Unexpected server-side issue occurred."
    },
    getStorageUri: {
      400: "Bad Request",
      401: "Invalid authentication",
      403: "You do not have required permissions",
      500: "Unexpected server-side issue occurred."
    }
  };

}
export const BackoffConstants = {
  MAX_RETRIES: 10,
};
