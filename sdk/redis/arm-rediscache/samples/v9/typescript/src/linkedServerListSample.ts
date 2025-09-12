// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of linked servers associated with this redis cache (requires Premium SKU).
 *
 * @summary gets the list of linked servers associated with this redis cache (requires Premium SKU).
 * x-ms-original-file: 2024-11-01/RedisCacheLinkedServer_List.json
 */
async function linkedServerList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.linkedServer.list("rg1", "cache1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await linkedServerList();
}

main().catch(console.error);
