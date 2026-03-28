// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the Cache specified by its identifier.
 *
 * @summary gets the details of the Cache specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetCache.json
 */
async function apiManagementGetCache() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.cache.get("rg1", "apimService1", "c1");
  console.log(result);
}

async function main() {
  await apiManagementGetCache();
}

main().catch(console.error);
