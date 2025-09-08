// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the state of specified private endpoint connection associated with the redis cache.
 *
 * @summary Update the state of specified private endpoint connection associated with the redis cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCachePutPrivateEndpointConnection.json
 */

import type { PrivateEndpointConnection } from "@azure/arm-rediscache";
import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function redisCachePutPrivateEndpointConnection(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rgtest01";
  const cacheName = "cachetest01";
  const privateEndpointConnectionName = "pectest01";
  const properties: PrivateEndpointConnection = {
    privateLinkServiceConnectionState: {
      description: "Auto-Approved",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.beginPutAndWait(
    resourceGroupName,
    cacheName,
    privateEndpointConnectionName,
    properties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await redisCachePutPrivateEndpointConnection();
}

main().catch(console.error);
