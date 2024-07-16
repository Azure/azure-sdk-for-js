// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const ServiceErrorMessageConstants = {
  NO_AUTH_ERROR:
    "Could not authenticate with the service. Please refer to https://aka.ms/mpt/authentication for more information.", // no mpt pat set and could not fetch entra token
  NO_SERVICE_URL_ERROR: "Please set PLAYWRIGHT_SERVICE_URL in your environment variables.",
  INVALID_MPT_PAT_ERROR: "The service PAT set in the environment variable is invalid.",
  EXPIRED_MPT_PAT_ERROR: "The service PAT has expired. Please create a new PAT.",
  INVALID_GLOBAL_FUNCTION: "file must export a single function",
  DUPLICATE_REPORTER: "Reporter with the same name already exists",
};
