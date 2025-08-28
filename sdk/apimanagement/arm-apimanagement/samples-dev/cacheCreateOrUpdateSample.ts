// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an External Cache to be used in Api Management instance.
 *
 * @summary Creates or updates an External Cache to be used in Api Management instance.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateCache.json
 */

import { CacheContract, ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateCache(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const cacheId = "c1";
  const parameters: CacheContract = {
    description: "Redis cache instances in West India",
    connectionString:
      "apim.redis.cache.windows.net:6380,password=xc,ssl=True,abortConnect=False",
    resourceId:
      "https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Cache/redis/apimservice1",
    useFromLocation: "default",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.cache.createOrUpdate(
    resourceGroupName,
    serviceName,
    cacheId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateCache();
}

main().catch(console.error);
