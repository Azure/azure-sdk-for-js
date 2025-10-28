// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the detailed information about a linked server of a redis cache (requires Premium SKU).
 *
 * @summary gets the detailed information about a linked server of a redis cache (requires Premium SKU).
 * x-ms-original-file: 2024-11-01/RedisCacheLinkedServer_Get.json
 */
async function linkedServerGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.linkedServer.get("rg1", "cache1", "cache2");
  console.log(result);
}

async function main(): Promise<void> {
  await linkedServerGet();
}

main().catch(console.error);
