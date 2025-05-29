import type { ApiErrorMessage } from "./types.js";
export declare const EntraIdAccessTokenConstants: {
    LIFETIME_LEFT_THRESHOLD_IN_MINUTES_FOR_ROTATION: number;
    SCOPE: string;
    ROTATION_INTERVAL_PERIOD_IN_MINUTES: number;
};
/** @public
 *
 * OS types supported on Microsoft Playwright Testing cloud hosted browsers
 */
export declare const ServiceOS: {
    readonly LINUX: "linux";
    readonly WINDOWS: "windows";
};
/** @public
 *
 * Authentication types supported on Microsoft Playwright Testing
 */
export declare const ServiceAuth: {
    readonly ENTRA_ID: "ENTRA_ID";
    readonly ACCESS_TOKEN: "ACCESS_TOKEN";
};
/** @public
 *
 * Environment variables used by Microsoft Playwright Testing
 */
export declare const ServiceEnvironmentVariable: {
    PLAYWRIGHT_SERVICE_ACCESS_TOKEN: string;
    PLAYWRIGHT_SERVICE_URL: string;
};
export declare const DefaultConnectOptionsConstants: {
    DEFAULT_TIMEOUT: number;
    DEFAULT_SLOW_MO: number;
    DEFAULT_EXPOSE_NETWORK: string;
    DEFAULT_SERVICE_OS: "linux";
};
export declare const API_VERSION = "2023-10-01-preview";
export declare class Constants {
    static readonly TEST_FRAMEWORK_NAME = "PLAYWRIGHT";
    static readonly TEST_FRAMEWORK_RUNNERNAME = "PLAYWRIGHT";
    static readonly TEST_TYPE = "WebTest";
    static readonly TEST_SDK_LANGUAGE = "JAVASCRIPT";
    static readonly DEFAULT_DASHBOARD_ENDPOINT = "https://playwright.microsoft.com";
    static readonly DEFAULT_SERVICE_ENDPOINT = "https://{region}.reporting.api.playwright-test.io";
    static readonly DEFAULT_REDACTED_MESSAGE = "***REDACTED***";
    static readonly SAS_URI_SEPARATOR = "?";
    static readonly DEFAULT_TEST_RUN_NAME = "MPTReporterTests";
    static readonly TEST_BATCH_SIZE = 50;
    static readonly UPLOAD_MODE = "sdk";
    static readonly GIT_VERSION_COMMAND = "git --version";
    static readonly GIT_REV_PARSE = "git rev-parse --is-inside-work-tree";
    static readonly GIT_COMMIT_MESSAGE_COMMAND = "git log -1 --pretty=format:\"%s\"";
    static readonly ERROR_MESSAGES_MAX_LENGTH = 100;
    static readonly sevenDaysInMs: number;
    static readonly oneDayInMs: number;
    static readonly API_VERSION = "2024-09-01-preview";
    static readonly OS = "Os";
    static readonly NON_RETRYABLE_STATUS_CODES: number[];
    static readonly SupportedRegions: string[];
    static readonly CONFLICT_409_ERROR_MESSAGE = "Test run with id {runId} already exists. Provide a unique run id.";
    static readonly FORBIDDEN_403_ERROR_MESSAGE = "You do not have the required permissions to upload test results. This could be because\n\n  a. Reporting is not enabled for your workspace {workspaceId}. Enable the Reporting feature under Feature management settings using the Playwright portal: https://playwright.microsoft.com/workspaces/{workspaceId}/settings/general\n  b. You do not have the required roles on the workspace. Only Owner and Contributor roles can run tests. Contact the service administrator.\n  c. The workspace you are trying to run the tests on is in a different Azure tenant than what you are signed into. Check the tenant id from Azure portal (https://aka.ms/mpt/find-tenant-id) and login using the command 'az login --tenant <TENANT_ID>\n  ";
    static readonly testRunsEndpoint: string;
    static readonly testRunsShardEndpoint: string;
    static readonly storageUriEndpoint: string;
    static readonly testResultsEndpoint: string;
    static readonly patchTestRun: string;
    static readonly getTestRun: string;
    static readonly patchTestRunShardStart: string;
    static readonly patchTestRunShardEnd: string;
    static readonly postTestResults: string;
    static readonly getStorageUri: string;
    static readonly ERROR_MESSAGE: ApiErrorMessage;
}
export declare const TestErrorType: {
    Scalable: string;
    Reporting: string;
};
export declare const TestResultErrorConstants: {
    key: string;
    message: string;
    pattern: RegExp;
    type: string;
}[];
export declare const InternalEnvironmentVariables: {
    MPT_PLAYWRIGHT_VERSION: string;
    MPT_SETUP_FATAL_ERROR: string;
    MPT_SERVICE_RUN_NAME: string;
    MPT_SERVICE_RUN_ID: string;
    MPT_CLOUD_HOSTED_BROWSER_USED: string;
    MPT_SERVICE_OS: string;
    MPT_SERVICE_REPORTING_URL: string;
    ONE_TIME_OPERATION_FLAG: string;
};
export declare const MINIMUM_SUPPORTED_PLAYWRIGHT_VERSION = "1.47.0";
//# sourceMappingURL=constants.d.ts.map