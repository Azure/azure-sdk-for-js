// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of specified private endpoint connection associated with the redis cache.
 *
 * @summary update the state of specified private endpoint connection associated with the redis cache.
 * x-ms-original-file: 2024-11-01/RedisCachePutPrivateEndpointConnection.json
 */
async function redisCachePutPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.put(
    "rgtest01",
    "cachetest01",
    "pectest01",
    {
      properties: {
        privateLinkServiceConnectionState: {
          description: "Auto-Approved",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await redisCachePutPrivateEndpointConnection();
}

main().catch(console.error);
