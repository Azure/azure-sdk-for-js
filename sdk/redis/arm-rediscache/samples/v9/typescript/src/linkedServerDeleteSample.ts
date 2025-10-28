// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the linked server from a redis cache (requires Premium SKU).
 *
 * @summary deletes the linked server from a redis cache (requires Premium SKU).
 * x-ms-original-file: 2024-11-01/RedisCacheLinkedServer_Delete.json
 */
async function linkedServerDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  await client.linkedServer.delete("rg1", "cache1", "cache2");
}

async function main(): Promise<void> {
  await linkedServerDelete();
}

main().catch(console.error);
