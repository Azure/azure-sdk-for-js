// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the details of the cache specified by its identifier.
 *
 * @summary updates the details of the cache specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateCache.json
 */
async function apiManagementUpdateCache(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.cache.update("rg1", "apimService1", "c1", "*", {
    useFromLocation: "westindia",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateCache();
}

main().catch(console.error);
