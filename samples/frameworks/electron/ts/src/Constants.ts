/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.
*/

import { getEnvironmentVariable } from "./utils";

// Every message that is sent between the main and renderer process.
export const IPC_MESSAGES = {
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT"
};

const tenantId = getEnvironmentVariable("TENANT_ID");
const clientId = getEnvironmentVariable("CLIENT_ID");

// The MSAL configuration, used for authentication.
// For more information about MSAL please see https://www.npmjs.com/package/msal
export const MSAL_CONFIG = {
  clientId,
  tenantId,
  redirectUri: "msal://redirect"
};
