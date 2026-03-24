// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the Cache specified by its identifier.
 *
 * @summary gets the entity state (Etag) version of the Cache specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadCache.json
 */
async function apiManagementHeadCache() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.cache.getEntityTag("rg1", "apimService1", "default");
}

async function main() {
  await apiManagementHeadCache();
}

main().catch(console.error);
