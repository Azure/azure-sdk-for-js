// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified API of the API Management service instance.
 *
 * @summary deletes the specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApi.json
 */
async function apiManagementDeleteApi() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.api.delete("rg1", "apimService1", "echo-api", "*");
}

async function main() {
  await apiManagementDeleteApi();
}

main().catch(console.error);
