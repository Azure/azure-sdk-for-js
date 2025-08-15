// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the linked server from a redis cache (requires Premium SKU).
 *
 * @summary Deletes the linked server from a redis cache (requires Premium SKU).
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheLinkedServer_Delete.json
 */
async function linkedServerDelete(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const name = "cache1";
  const linkedServerName = "cache2";
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.linkedServer.beginDeleteAndWait(
    resourceGroupName,
    name,
    linkedServerName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await linkedServerDelete();
}

main().catch(console.error);
