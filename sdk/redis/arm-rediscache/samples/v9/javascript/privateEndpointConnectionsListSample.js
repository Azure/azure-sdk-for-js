// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the private endpoint connections associated with the redis cache.
 *
 * @summary list all the private endpoint connections associated with the redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheListPrivateEndpointConnections.json
 */
async function redisCacheListPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list("rgtest01", "cachetest01")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await redisCacheListPrivateEndpointConnection();
}

main().catch(console.error);
