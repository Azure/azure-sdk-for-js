// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an External Cache to be used in Api Management instance.
 *
 * @summary creates or updates an External Cache to be used in Api Management instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateCache.json
 */
async function apiManagementCreateCache() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.cache.createOrUpdate("rg1", "apimService1", "c1", {
    description: "Redis cache instances in West India",
    connectionString: "apim.redis.cache.windows.net:6380,password=xc,ssl=True,abortConnect=False",
    resourceId:
      "https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Cache/redis/apimservice1",
    useFromLocation: "default",
  });
  console.log(result);
}

async function main() {
  await apiManagementCreateCache();
}

main().catch(console.error);
