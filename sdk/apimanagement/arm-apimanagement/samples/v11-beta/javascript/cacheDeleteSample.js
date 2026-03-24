// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specific Cache.
 *
 * @summary deletes specific Cache.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteCache.json
 */
async function apiManagementDeleteCache() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.cache.delete("rg1", "apimService1", "southindia", "*");
}

async function main() {
  await apiManagementDeleteCache();
}

main().catch(console.error);
