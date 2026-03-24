// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Wiki from an API.
 *
 * @summary deletes the specified Wiki from an API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApiWiki.json
 */
async function apiManagementDeleteApiWiki() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiWiki.delete("rg1", "apimService1", "57d1f7558aa04f15146d9d8a", "*");
}

async function main() {
  await apiManagementDeleteApiWiki();
}

main().catch(console.error);
