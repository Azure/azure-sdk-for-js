// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds a linked server to the Redis cache (requires Premium SKU).
 *
 * @summary adds a linked server to the Redis cache (requires Premium SKU).
 * x-ms-original-file: 2024-11-01/RedisCacheLinkedServer_Create.json
 */
async function linkedServerCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.linkedServer.create("rg1", "cache1", "cache2", {
    properties: {
      linkedRedisCacheId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Cache/Redis/cache2",
      linkedRedisCacheLocation: "West US",
      serverRole: "Secondary",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await linkedServerCreate();
}

main().catch(console.error);
