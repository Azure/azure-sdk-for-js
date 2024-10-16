/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.

  This sample demonstrates how to create and share an `InteractiveBrowserCredential`
  to authenticate client-side requests in a single-page application.

  For more information on the authentication strategies available for 
  client-side applications, please refer to 
  https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md.
*/

import { InteractiveBrowserCredential } from "@azure/identity";
import { getEnvironmentVariable } from ".";

const clientId = getEnvironmentVariable("REACT_APP_CLIENT_ID");
const tenantId = getEnvironmentVariable("REACT_APP_TENANT_ID");
export const credential = new InteractiveBrowserCredential({ clientId, tenantId });
