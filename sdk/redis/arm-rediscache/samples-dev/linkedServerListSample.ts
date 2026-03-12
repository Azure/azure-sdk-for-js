// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the list of linked servers associated with this redis cache (requires Premium SKU).
 *
 * @summary Gets the list of linked servers associated with this redis cache (requires Premium SKU).
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheLinkedServer_List.json
 */

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function linkedServerList(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const name = "cache1";
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.linkedServer.list(resourceGroupName, name)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await linkedServerList();
}

main().catch(console.error);
