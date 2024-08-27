// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const ServiceErrorMessageConstants = {
  NO_AUTH_ERROR:
    "Could not authenticate with the service. Please refer to https://aka.ms/mpt/authentication for more information.", // no mpt pat set and could not fetch entra token
  NO_SERVICE_URL_ERROR: "Please set PLAYWRIGHT_SERVICE_URL in your environment variables.",
  INVALID_MPT_PAT_ERROR: "The Access Token provided in the environment variable is invalid.",
  EXPIRED_MPT_PAT_ERROR: "The Access Token you are using is expired. Create a new token.",
  INVALID_GLOBAL_FUNCTION: "file must export a single function",
  DUPLICATE_REPORTER:
    "Another reporter with the same name already exists. Please resolve the duplicate and try again.",
  POSSIBLE_ERRORS_DETECTED_IN_SCALABLE_RUN:
    "We detected possible errors in your test run using cloud hosted browsers. Please refer to https://aka.ms/mpt/troubleshooting for more information.",
};
