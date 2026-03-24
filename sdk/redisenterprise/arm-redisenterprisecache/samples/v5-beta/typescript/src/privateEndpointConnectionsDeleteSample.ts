// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the Redis Enterprise cluster.
 *
 * @summary deletes the specified private endpoint connection associated with the Redis Enterprise cluster.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDeletePrivateEndpointConnection.json
 */
async function redisEnterpriseDeletePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete("rg1", "cache1", "pectest01");
}

async function main(): Promise<void> {
  await redisEnterpriseDeletePrivateEndpointConnection();
}

main().catch(console.error);
