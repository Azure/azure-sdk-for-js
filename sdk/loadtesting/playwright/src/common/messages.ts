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
      `Failed to create the test run in the Playwright workspaces. Error: ${errorDetails}. Please refer to https://aka.ms/pww/docs/troubleshooting for more information.`,
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
    message: "Storage URI not found in workspace details",
  },
  UNABLE_TO_EXTRACT_WORKSPACE_ID: {
    key: "UnableToExtractWorkspaceId",
    message: "Unable to extract workspace ID from service URL",
  },
  HTML_REPORT_UPLOAD_FAILED: {
    key: "HtmlReportUploadFailed",
    message: "HTML report upload failed",
    formatWithError: (errorMessage: string): string => `HTML report upload failed: ${errorMessage}`,
  },
  HTML_REPORT_FOLDER_NOT_FOUND: {
    key: "HtmlReportFolderNotFound",
    message: "HTML report folder not found",
    formatWithFolder: (folderName: string): string => `HTML report folder not found: ${folderName}`,
  },
  UPLOAD_FAILED_MULTIPLE_FILES: {
    key: "UploadFailedMultipleFiles",
    message: "Upload failed: multiple files could not be uploaded",
    formatWithDetails: (failed: number, errors: string[]): string =>
      `Upload failed: ${failed} files could not be uploaded. Sample errors: ${errors.join(", ")}`,
  },
  UPLOAD_RETRY_EXHAUSTED: {
    key: "UploadRetryExhausted",
    message: "Failed after maximum retry attempts",
    formatWithDetails: (maxRetries: number, errorMessage: string): string =>
      `Failed after ${maxRetries} attempts: ${errorMessage}`,
  },
  REPORTER_REQUIRES_ENTRA_AUTH: {
    key: "ReporterRequiresEntraAuth",
    message: "The Azure Playwright Reporter can only be used with ENTRA_ID authentication.",
  },
  HTML_REPORTER_REQUIRED: {
    key: "HtmlReporterRequired",
    message:
      "The Azure Playwright Reporter requires the 'html' reporter to be configured in your Playwright configuration. Please add the HTML reporter to generate test reports that can be uploaded to Azure Storage. Example: reporter: [['html'], ['@azure/playwright/reporter']]",
  },
};
