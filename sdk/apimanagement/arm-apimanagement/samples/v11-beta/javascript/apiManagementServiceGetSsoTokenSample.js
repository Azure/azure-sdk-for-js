// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Single-Sign-On token for the API Management Service which is valid for 5 Minutes.
 *
 * @summary gets the Single-Sign-On token for the API Management Service which is valid for 5 Minutes.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementServiceGetSsoToken.json
 */
async function apiManagementServiceGetSsoToken() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.getSsoToken("rg1", "apimService1");
  console.log(result);
}

async function main() {
  await apiManagementServiceGetSsoToken();
}

main().catch(console.error);
