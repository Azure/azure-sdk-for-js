// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const ServiceErrorMessageConstants = {
  NO_SERVICE_URL_ERROR: {
    key: "NoServiceUrlError",
    message:
      "The value for the PLAYWRIGHT_SERVICE_URL variable is not set correctly. Please verify the URL and try again.",
  },
  INVALID_GLOBAL_FUNCTION: {
    key: "InvalidGlobalFunction",
    message: "File must export a single function.",
  },
  INVALID_PLAYWRIGHT_VERSION_ERROR: {
    key: "InvalidPlaywrightVersionError",
    message:
      "The Playwright version you are using is not supported. See the list of supported versions at https://aka.ms/pww/docs/supported-versions.",
  },
  PLAYWRIGHT_VERSION_TOO_OLD_FOR_REPORTING: {
    key: "PlaywrightVersionTooOldForReporting",
    message:
      "To use the Playwright Workspaces reporting feature, you need Playwright version 1.57 or later installed. Update the Playwright package to a supported version and try again.",
  },
  MULTIPLE_SETUP_FILE_PLAYWRIGHT_VERSION_ERROR: {
    key: "MultipleSetupFilePlaywrightVersionError",
    message:
      "The Playwright version you are using does not support multiple setup/teardown files. Please update to Playwright version 1.49.0 or higher.",
  },
  WORKSPACE_MISMATCH_ERROR: {
    key: "InvalidAccessToken",
    message:
      "The provided access token does not match the specified workspace URL. Please verify that both values are correct.",
  },
  NO_AUTH_ERROR_PAT_TOKEN: {
    key: "NoAuthErrorPatToken",
    message:
      "Please set PLAYWRIGHT_SERVICE_ACCESS_TOKEN env variable when using ACCESS_TOKEN authentication. For more information, see https://aka.ms/pww/docs/authentication",
  },
  NO_AUTH_ERROR_ENTRA_TOKEN: {
    key: "NoAuthErrorEntraToken",
    message:
      "Could not authenticate with the service. For more information, see https://aka.ms/pww/docs/authentication",
  },
  INVALID_MPT_PAT_ERROR: {
    key: "InvalidMptPatError",
    message:
      "The PLAYWRIGHT_SERVICE_ACCESS_TOKEN provided is invalid. Please make sure to set a valid token.",
  },
  EXPIRED_MPT_PAT_ERROR: {
    key: "ExpiredMptPatError",
    message: "The PLAYWRIGHT_SERVICE_ACCESS_TOKEN provided has expired. Create a new token.",
  },
  NO_CRED_ENTRA_AUTH_ERROR: {
    key: "NoCredEntraAuthError",
    message:
      "Missing 'credential' parameter which is required when using ENTRA_ID authentication, Azure credential not provided. See https://aka.ms/pww/docs/authentication for more information.",
  },
  FAILED_TO_CREATE_TEST_RUN: {
    key: "FailedToCreateTestRun",
    message:
      "Failed to create the test run in the Playwright workspaces. For more information, see https://aka.ms/pww/docs/troubleshooting",
    formatWithErrorDetails: (errorDetails: string): string =>
      `Failed to create the test run in the Playwright workspaces. Error: ${errorDetails}. For more information, see https://aka.ms/pww/docs/troubleshooting`,
  },
  INVALID_PARAM_WITH_SERVICE_CONFIG: {
    key: "InvalidParamWithServiceConfig",
    message: `Remove serviceAuth, runId, and runName from getConnectOptions when using createAzurePlaywrightConfig. Configure these options through createAzurePlaywrightConfig instead.`,
  },
  INVALID_RUN_ID_FORMAT: {
    key: "InvalidRunIdFormat",
    message: "The Run ID must be a valid GUID format. Please provide a valid GUID for the Run ID.",
  },
  INVALID_AUTH_TYPE_ERROR: {
    key: "InvalidAuthTypeError",
    message: "Invalid authentication type specified. Please use either ENTRA_ID or ACCESS_TOKEN.",
  },
  FAILED_TO_GET_WORKSPACE_DETAILS: {
    key: "FailedToGetWorkspaceDetails",
    message: "Failed to retrieve workspace details from the Playwright service.",
    formatWithErrorDetails: (errorDetails: string): string =>
      `Failed to retrieve workspace details from the Playwright service. Error: ${errorDetails}. Please verify your service URL and authentication credentials.`,
  },
  STORAGE_URI_NOT_FOUND: {
    key: "StorageUriNotFound",
    message: "Storage Account is not linked with this Playwright Workspace.",
  },
  STORAGE_AUTHORIZATION_FAILED: {
    key: "StorageAuthorizationFailed",
    message:
      "The user is not authorized to perform this operation. Please make sure you have the Storage Blob Data Contributor role assigned to the storage account. For more information, see https://aka.ms/pww-reporting",
    formatWithStorageAccount: (storageAccountName: string): string =>
      `The user is not authorized to perform this operation. Please make sure you have the Storage Blob Data Contributor role assigned to the storage account - ${storageAccountName}. For more information, see https://aka.ms/pww-reporting`,
  },
  UNABLE_TO_EXTRACT_WORKSPACE_ID: {
    key: "UnableToExtractWorkspaceId",
    message: "Unable to extract workspace ID from service URL",
  },
  STORAGE_ACCOUNT_DELETED: {
    key: "StorageAccountDeleted",
    message:
      "The storage account linked to your Playwright Workspace may have been deleted. Please link a different storage account to your Playwright Workspace before trying again. To learn more on how to link a new storage account, refer to https://aka.ms/pww-reporting-migration",
    formatWithStorageAccount: (storageAccountName: string): string =>
      `The storage account linked to your Playwright Workspace (${storageAccountName}) may have been deleted. Please link a different storage account to your Playwright Workspace before trying again. To learn more on how to link a new storage account, refer to https://aka.ms/pww-reporting-migration`,
  },
  REPORTER_REQUIRES_ENTRA_AUTH: {
    key: "ReporterRequiresEntraAuth",
    message:
      "Playwright Workspaces Reporter can only be used with ENTRA_ID authentication. For more information, see https://aka.ms/pww/docs/authentication",
  },
  HTML_REPORTER_REQUIRED: {
    key: "HtmlReporterRequired",
    message:
      "Playwright Workspaces Reporter requires the 'html' reporter to be configured in your Playwright configuration. Please add the 'html' reporter before playwright workspace reporter to generate test reports that can be uploaded to Azure Storage. Example: reporter: [['html'], ['@azure/playwright/reporter']]. For more information, see https://aka.ms/pww-reporting",
  },
  WORKSPACE_METADATA_FETCH_FAILED: {
    key: "WorkspaceMetadataFetchFailed",
    message:
      "Failed to retrieve workspace configuration. Reporting will be disabled for this run. Please check your authentication credentials and service URL.",
  },
  WORKSPACE_REPORTING_DISABLED: {
    key: "WorkspaceReportingDisabled",
    message:
      "Playwright Workspaces reporting: DISABLED. Reporting is not enabled for the Playwright Workspace. To learn more about how to enable reporting and link a storage account, see https://aka.ms/pww-reporting",
  },
  WORKSPACE_REPORTING_STORAGE_NOT_LINKED: {
    key: "WorkspaceReportingStorageNotLinked",
    message:
      "Playwright Workspaces reporting: DISABLED. Reporting is enabled for the Playwright Workspace, but no storage account is linked. Please link a storage account to enable reporting. For more information, see https://aka.ms/pww-reporting",
  },
  UPLOAD_FAILED_FILES: {
    key: "UploadFailedFiles",
    message: "Upload failed: files could not be uploaded",
    formatWithCount: (failed: number): string =>
      `Upload failed: ${failed} files could not be uploaded`,
  },
  PLAYWRIGHT_TEST_REPORT_NOT_FOUND: {
    key: "PlaywrightTestReportNotFound",
    message: "Playwright test report not found",
    formatWithFolder: (folderName: string): string =>
      `Playwright test report not found: ${folderName}. For more information, see https://aka.ms/pww-reporting`,
  },
  REPORTING_ENABLED: {
    key: "ReportingEnabled",
    message: "Playwright Workspaces reporting: ENABLED",
  },
  COLLECTING_ARTIFACTS: {
    key: "CollectingArtifacts",
    message: "Collecting artifacts: screenshots, videos, traces.",
  },
  REPORTING_STATUS_SUCCESS: {
    key: "ReportingStatusSuccess",
    message: "Reporting upload status: SUCCESS",
  },
  REPORTING_STATUS_PARTIAL: {
    key: "ReportingStatusPartial",
    message: "Reporting upload status: Partially Uploaded",
  },
  REPORTING_STATUS_FAILED: {
    key: "ReportingStatusFailed",
    message: "Reporting upload status: FAILED",
  },
  TEST_REPORT_VIEW_URL: {
    key: "TestReportViewUrl",
    message: "Published report URL: ",
    formatWithUrl: (url: string): string => `Published report URL: ${url}`,
  },
  UPLOADING_ARTIFACTS: {
    key: "UploadingArtifacts",
    message: "Uploading artifacts to storage",
    formatWithDetails: (storageAccount: string, container: string, folder: string): string =>
      `Uploading artifacts to: storage account= ${storageAccount}, storage container= ${container}, folder= ${folder}`,
  },
  FAILED_TO_GET_WORKSPACE_METADATA: {
    key: "FailedToGetWorkspaceMetadata",
    message: "Failed to get workspace metadata",
    formatWithError: (error: string): string => error,
  },
  TEST_RUN_CREATION_FAILED: {
    key: "TestRunCreationFailed",
    message: "Failed to create test run. Test execution will continue.",
    formatWithErrorDetails: (errorDetails: string): string =>
      `Failed to create test run. Error: ${errorDetails}. Test execution will continue.`,
  },
  REPORTING_TEST_RUN_FAILED: {
    key: "ReportingTestRunFailed",
    message: "Test run creation failed during setup.",
  },
  REPORTER_REQUIRES_SERVICE_CONFIG: {
    key: "ReporterRequiresServiceConfig",
    message:
      "Playwright Workspaces Reporter requires the use of service configuration via createAzurePlaywrightConfig. For more information, see https://aka.ms/pww-reporting.",
  },
};
