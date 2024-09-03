// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ApiErrorMessage } from "./types";

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
  DEFAULT_TIMEOUT: 30000,
  DEFAULT_SLOW_MO: 0,
  DEFAULT_EXPOSE_NETWORK: "<loopback>",
  DEFAULT_SERVICE_OS: ServiceOS.LINUX,
};

export const API_VERSION = "2023-10-01-preview";

// Do not put an ending slash for the urls,
// for example use https://www.microsoft.com/en-in and not https://www.microsoft.com/en-in/

export class Constants {
  // Config related constants
  public static readonly TEST_FRAMEWORK_NAME = "PLAYWRIGHT";
  public static readonly TEST_FRAMEWORK_RUNNERNAME = "PLAYWRIGHT";
  public static readonly TEST_TYPE = "WebTest";
  public static readonly TEST_SDK_LANGUAGE = "JAVASCRIPT";
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
  public static readonly API_VERSION = "2024-09-01-preview";
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
    "workspaces/{workspaceId}/test-runs/{testRunId}:updateShardExecutionStatus";
  public static readonly storageUriEndpoint: string =
    "workspaces/{workspaceId}/test-runs/{testRunId}:createArtifactsUploadBaseUri";
  public static readonly testResultsEndpoint: string =
    "workspaces/{workspaceId}/test-results/upload-batch";
  public static readonly getTestRun: string = "getTestRun";
  public static readonly patchTestRunShardStart: string = "patchTestRunShardStart";
  public static readonly patchTestRunShardEnd: string = "patchTestRunShardEnd";
  public static readonly postTestResults: string = "postTestResults";
  public static readonly getStorageUri: string = "getStorageUri";

  public static readonly ERROR_MESSAGE: ApiErrorMessage = {
    getTestRun: {
      400: "Bad Request",
      401: "Invalid authentication to run test.",
      403: "You do not have required permissions to run test.",
      500: "An unexpected error occurred on our server. Our team is working to resolve the issue. Please try again later, or contact support if the problem continues.",
      429: "You have exceeded the rate limit for the test run service API. Please wait and try again later",
      504: "The request to the test run service timed out. Please try again later",
      503: "The test run service is currently unavailable. Please check the service status and try again.",
    },
    patchTestRunShardStart: {
      400: "Bad Request",
      401: "Invalid authentication",
      403: "You do not have required permissions.",
      500: "An unexpected error occurred on our server. Our team is working to resolve the issue. Please try again later, or contact support if the problem continues.",
      429: "You have exceeded the rate limit for the est run shard start service API. Please wait and try again later",
      504: "The request to the test run shard start service timed out. Please try again later",
      503: "The test run shard start service is currently unavailable. Please check the service status and try again.",
    },
    patchTestRunShardEnd: {
      400: "Bad Request",
      401: "Invalid authentication",
      403: "You do not have required permissions.",
      500: "An unexpected error occurred on our server. Our team is working to resolve the issue. Please try again later, or contact support if the problem continues.",
      429: "You have exceeded the rate limit for the test run shard end service API. Please wait and try again later",
      504: "The request to the test run shard end service timed out. Please try again later",
      503: "The test run shard end service is currently unavailable. Please check the service status and try again.",
    },
    postTestResults: {
      400: "Bad Request",
      401: "Invalid authentication to publish test result.",
      403: "You do not have required permissions to publish test results to the service. Please contact your workspace administrator.",
      500: "An unexpected error occurred on our server. Our team is working to resolve the issue. Please try again later, or contact support if the problem continues.",
      429: "You have exceeded the rate limit for the publish test results service API. Please wait and try again later",
      504: "The request to the publish test results service timed out. Please try again later",
      503: "The publish test results service is currently unavailable. Please check the service status and try again.",
    },
    getStorageUri: {
      400: "Bad Request",
      401: "Invalid authentication",
      403: "You do not have required permissions",
      500: "An unexpected error occurred on our server. Our team is working to resolve the issue. Please try again later, or contact support if the problem continues.",
      429: "You have exceeded the rate limit for the get storage uri service API. Please wait and try again later",
      504: "The request to the get storage uri service timed out. Please try again later",
      503: "The get storage uri service is currently unavailable. Please check the service status and try again.",
    },
  };
}
export const BackoffConstants = {
  MAX_RETRIES: 10,
};

export const TestErrorType = {
  Scalable: "Scalable",
  Reporting: "Reporting",
};

export const TestResultErrorConstants = [
  {
    key: "Unauthorized_Scalable",
    message: "The authentication token provided is invalid. Please check the token and try again.",
    pattern: /(?=.*browserType\.connect)(?=.*401 Unauthorized)/i,
    type: TestErrorType.Scalable,
  },
  {
    key: "NoPermissionOnWorkspace_Scalable",
    message: `You do not have the required permissions to run tests. This could be because:

    a. You do not have the required roles on the workspace. Only Owner and Contributor roles can run tests. Contact the service administrator.
    b. The workspace you are trying to run the tests on is in a different Azure tenant than what you are signed into. Check the tenant id from Azure portal and login using the command 'az login --tenant <TENANT_ID>'.
    `,
    pattern:
      /(?=.*browserType\.connect)(?=.*403 Forbidden)(?=[\s\S]*CheckAccess API call with non successful response)/i,
    type: TestErrorType.Scalable,
  },
  {
    key: "InvalidWorkspace_Scalable",
    message: "The specified workspace does not exist. Please verify your workspace settings.",
    pattern:
      /(?=.*browserType\.connect)(?=.*403 Forbidden)(?=.*InvalidAccountOrSubscriptionState)/i,
    type: TestErrorType.Scalable,
  },
  {
    key: "AccessKeyBasedAuthNotSupported_Scalable",
    message:
      "Authentication through service access token is disabled for this workspace. Please use Entra ID to authenticate.",
    pattern: /(?=.*browserType\.connect)(?=.*403 Forbidden)(?=.*AccessKeyBasedAuthNotSupported)/i,
    type: TestErrorType.Scalable,
  },
  {
    key: "ServiceUnavailable_Scalable",
    message: "The service is currently unavailable. Please check the service status and try again.",
    pattern: /(?=.*browserType\.connect)(?=.*503 Service Unavailable)/i,
    type: TestErrorType.Scalable,
  },
  {
    key: "GatewayTimeout_Scalable",
    message: "The request to the service timed out. Please try again later.",
    pattern: /(?=.*browserType\.connect)(?=.*504 Gateway Timeout)/i,
    type: TestErrorType.Scalable,
  },
  {
    key: "QuotaLimitError_Scalable",
    message:
      "It is possible that the maximum number of concurrent sessions allowed for your workspace has been exceeded.",
    pattern: /browserType.connect: Timeout .* exceeded/i,
    type: TestErrorType.Scalable,
  },
  {
    key: "BrowserConnectionError_Scalable",
    message: "The service is currently unavailable. Please try again after some time.",
    pattern: /browserType.connect: Target page, context or browser has been closed/i,
    type: TestErrorType.Scalable,
  },
];

export const InternalEnvironmentVariables = {
  MPT_PLAYWRIGHT_VERSION: "_MPT_PLAYWRIGHT_VERSION",
};

export const MINIMUM_SUPPORTED_PLAYWRIGHT_VERSION = "1.46.1";
