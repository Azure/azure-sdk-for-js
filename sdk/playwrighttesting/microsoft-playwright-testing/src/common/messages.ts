// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const ServiceErrorMessageConstants = {
  NO_AUTH_ERROR:
    "Could not authenticate with the service. Please refer to https://aka.ms/mpt/authentication for more information.", // no mpt pat set and could not fetch entra token
  NO_SERVICE_URL_ERROR:
    "The value for the PLAYWRIGHT_SERVICE_URL variable is not set correctly. Please verify the URL and try again.",
  INVALID_MPT_PAT_ERROR:
    "The authentication token provided is invalid. Check the token and try again.",
  EXPIRED_MPT_PAT_ERROR: "Your authentication token has expired. Create a new token.",
  INVALID_GLOBAL_FUNCTION: "file must export a single function",
  INVALID_PLAYWRIGHT_VERSION_ERROR:
    "The Playwright version you are using is not supported. See the list of supported versions at https://aka.ms/mpt/supported-versions.",
};
