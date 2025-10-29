// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the redis cache.
 *
 * @summary gets the specified private endpoint connection associated with the redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheGetPrivateEndpointConnection.json
 */
async function redisCacheGetPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "rgtest01",
    "cachetest01",
    "pectest01",
  );
  console.log(result);
}

async function main() {
  await redisCacheGetPrivateEndpointConnection();
}

main().catch(console.error);
