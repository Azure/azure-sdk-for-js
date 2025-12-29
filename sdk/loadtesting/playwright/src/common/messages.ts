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
  NO_AUTH_ERROR: {
    key: "NoAuthError",
    message:
      "Could not authenticate with the service. Please refer to https://aka.ms/pww/docs/authentication for more information.",
  },
  INVALID_MPT_PAT_ERROR: {
    key: "InvalidMptPatError",
    message: "The authentication token provided is invalid. Check the token and try again.",
  },
  EXPIRED_MPT_PAT_ERROR: {
    key: "ExpiredMptPatError",
    message: "Your authentication token has expired. Create a new token.",
  },
  NO_CRED_ENTRA_AUTH_ERROR: {
    key: "NoCredEntraAuthError",
    message:
      "Azure credentials not found when using Entra ID authentication. Please refer to https://aka.ms/pww/docs/authentication for more information.",
  },
  FAILED_TO_CREATE_TEST_RUN: {
    key: "FailedToCreateTestRun",
    message:
      "Failed to create the test run in the Playwright workspaces. Please refer to https://aka.ms/pww/docs/troubleshooting for more information.",
    formatWithErrorDetails: (errorDetails: string): string =>
      `Failed to create the test run in the Playwright workspaces. Error: ${errorDetails} Please refer to https://aka.ms/pww/docs/troubleshooting for more information.`,
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
      `Failed to retrieve workspace details from the Playwright service. Error: ${errorDetails} Please verify your service URL and authentication credentials.`,
  },
  STORAGE_URI_NOT_FOUND: {
    key: "StorageUriNotFound",
    message: "Storage Account is not linked with this Playwright Workspace.",
  },
  STORAGE_AUTHORIZATION_FAILED: {
    key: "StorageAuthorizationFailed",
    message:
      "This request is not authorized to perform this operation. Please make sure you have the Storage Blob Data Contributor role assigned to this storage account.",
  },
  UNABLE_TO_EXTRACT_WORKSPACE_ID: {
    key: "UnableToExtractWorkspaceId",
    message: "Unable to extract workspace ID from service URL",
  },
  REPORTER_REQUIRES_ENTRA_AUTH: {
    key: "ReporterRequiresEntraAuth",
    message:
      "Playwright Workspaces Reporter can only be used with ENTRA_ID authentication. Please refer to https://aka.ms/pww/docs/authentication for more information.",
  },
  HTML_REPORTER_REQUIRED: {
    key: "HtmlReporterRequired",
    message:
      "Playwright Workspaces Reporter requires the 'html' reporter to be configured in your Playwright configuration. Please add the 'html' reporter before playwright workspace reporter to generate test reports that can be uploaded to Azure Storage. Example: reporter: [['html'], ['@azure/playwright/reporter']]",
  },
  WORKSPACE_METADATA_FETCH_FAILED: {
    key: "WorkspaceMetadataFetchFailed",
    message:
      "Failed to retrieve workspace configuration. Reporting will be disabled for this run. Please check your authentication credentials and service URL.",
  },
  WORKSPACE_REPORTING_DISABLED: {
    key: "WorkspaceReportingDisabled",
    message:
      "Playwright Workspaces reporting: DISABLED. Please refer to https://aka.ms/pww-reporting for more information.",
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
      `Playwright test report not found: ${folderName}`,
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
    message: "Reporting status: SUCCESS",
  },
  REPORTING_STATUS_PARTIAL: {
    key: "ReportingStatusPartial",
    message: "Reporting status: Partially Uploaded",
  },
  REPORTING_STATUS_FAILED: {
    key: "ReportingStatusFailed",
    message: "Reporting status: FAILED",
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
      `Failed to create test run. Error: ${errorDetails} Test execution will continue.`,
  },
  REPORTING_TEST_RUN_FAILED: {
    key: "ReportingTestRunFailed",
    message: "Test run creation failed during setup.",
  },
  REPORTER_REQUIRES_SERVICE_CONFIG: {
    key: "ReporterRequiresServiceConfig",
    message:
      "Playwright Workspaces Reporter requires the use of service configuration via createAzurePlaywrightConfig.",
  },
};
