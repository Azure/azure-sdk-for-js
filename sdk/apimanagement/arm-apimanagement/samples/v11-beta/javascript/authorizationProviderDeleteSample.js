// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specific authorization provider from the API Management service instance.
 *
 * @summary deletes specific authorization provider from the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteAuthorizationProvider.json
 */
async function apiManagementDeleteAuthorizationProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.authorizationProvider.delete("rg1", "apimService1", "aadwithauthcode", "*");
}

async function main() {
  await apiManagementDeleteAuthorizationProvider();
}

main().catch(console.error);
