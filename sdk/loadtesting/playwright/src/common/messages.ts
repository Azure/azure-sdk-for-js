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
      "The Playwright version you are using is not supported. See the list of supported versions at https://aka.ms/mpt/supported-versions.",
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
      "Could not authenticate with the service. Please refer to https://aka.ms/mpt/authentication for more information.",
  },
  INVALID_MPT_PAT_ERROR: {
    key: "InvalidMptPatError",
    message: "The authentication token provided is invalid. Check the token and try again.",
  },
  EXPIRED_MPT_PAT_ERROR: {
    key: "ExpiredMptPatError",
    message: "Your authentication token has expired. Create a new token.",
  },
};
