/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  A common place to share application-level constants.
  Please replace the values with the values you noted down 
  when following the Prerequisites section in the README.
*/

// Used to authenticate using Azure AD as a service principal for role-based authentication.
// See the documentation for `AuthorizationCodeCredential` at the following link:
// https://docs.microsoft.com/en-us/javascript/api/@azure/identity/authorizationcodecredential?view=azure-node-latest
// You'll need to create an app registration to use this sample. Please refer to the README for instructions.

/**
 * The Directory (Tenant) ID for your App registration.
 */
export const TENANT_ID = "";
/**
 * The Application (Client) ID for your App registration.
 */
export const CLIENT_ID = "";

/**
 * Fully qualified namespace for Service Bus, typically: <namespace>.servicebus.windows.net
 */
export const SERVICE_BUS_NAMESPACE = "";

/**
 * Name of the Service Bus queue that has been set up
 */
export const SERVICE_BUS_QUEUE = "";

/**
 * URI for the Azure Blob Storage, typically typically https://<name>.blob.core.windows.net/
 */
export const BLOB_URI = "";

/**
 * The name of the Azure Blob Storage container
 */
export const BLOB_CONTAINER = "";

/**
 * The name of the Azure Blob we'll be uploading and fetching.
 * You may leave this unchanged.
 */
export const BLOB_NAME = "sample.txt";

/**
 * IPC Messages that are sent between the main and renderer process.
 */
export const IPC_MESSAGES = {
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT"
};

/**
 * The MSAL configuration data, used by both the main and renderer processes.
 */
export const MSAL_CONFIG = {
  clientId: CLIENT_ID,
  tenantId: TENANT_ID,
  redirectUri: "msal://redirect"
};
