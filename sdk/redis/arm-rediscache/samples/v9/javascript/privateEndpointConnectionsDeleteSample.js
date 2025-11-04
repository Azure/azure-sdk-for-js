// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the redis cache.
 *
 * @summary deletes the specified private endpoint connection associated with the redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheDeletePrivateEndpointConnection.json
 */
async function redisCacheDeletePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete("rgtest01", "cachetest01", "pectest01");
}

async function main() {
  await redisCacheDeletePrivateEndpointConnection();
}

main().catch(console.error);
