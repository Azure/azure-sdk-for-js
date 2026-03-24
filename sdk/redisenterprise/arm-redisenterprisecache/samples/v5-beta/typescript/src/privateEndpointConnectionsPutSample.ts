// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the state of the specified private endpoint connection associated with the Redis Enterprise cluster.
 *
 * @summary updates the state of the specified private endpoint connection associated with the Redis Enterprise cluster.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterprisePutPrivateEndpointConnection.json
 */
async function redisEnterprisePutPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.put("rg1", "cache1", "pectest01", {
    privateLinkServiceConnectionState: { description: "Auto-Approved", status: "Approved" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterprisePutPrivateEndpointConnection();
}

main().catch(console.error);
