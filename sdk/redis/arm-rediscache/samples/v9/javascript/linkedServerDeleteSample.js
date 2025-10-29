// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the linked server from a redis cache (requires Premium SKU).
 *
 * @summary deletes the linked server from a redis cache (requires Premium SKU).
 * x-ms-original-file: 2024-11-01/RedisCacheLinkedServer_Delete.json
 */
async function linkedServerDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  await client.linkedServer.delete("rg1", "cache1", "cache2");
}

async function main() {
  await linkedServerDelete();
}

main().catch(console.error);
