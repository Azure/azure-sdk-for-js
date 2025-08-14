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
      "Failed to create the test run in the Playwright service. Please refer to https://aka.ms/pww/docs/troubleshooting for more information.",
    formatWithErrorDetails: (errorDetails: string): string =>
      `Failed to create the test run in the Playwright service. Error: ${errorDetails}. Please refer to https://aka.ms/pww/docs/troubleshooting for more information.`,
  },
  INVALID_PARAM_WITH_SERVICE_CONFIG: {
    key: "InvalidParamWithServiceConfig",
    message: `Remove serviceAuth, runId, and runName from getConnectOptions when using getServiceConfig. Configure these options through getServiceConfig instead.`,
  },
  INVALID_RUN_ID_FORMAT: {
    key: "InvalidRunIdFormat",
    message: "The Run ID must be a valid GUID format. Please provide a valid GUID for the Run ID.",
  },
  INVALID_AUTH_TYPE_ERROR: {
    key: "InvalidAuthTypeError",
    message: "Invalid authentication type specified. Please use either ENTRA_ID or ACCESS_TOKEN.",
  },
};
