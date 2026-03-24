// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a database
 *
 * @summary updates a database
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesNoClusterCacheUpdateClustering.json
 */
async function redisEnterpriseDatabasesUpdateClusteringOnNoClusterCache(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.databases.update("rg1", "cache1", "default", {
    clientProtocol: "Encrypted",
    clusteringPolicy: "EnterpriseCluster",
    evictionPolicy: "NoEviction",
    port: 10000,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a database
 *
 * @summary updates a database
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesUpdate.json
 */
async function redisEnterpriseDatabasesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.databases.update("rg1", "cache1", "default", {
    accessKeysAuthentication: "Enabled",
    clientProtocol: "Encrypted",
    evictionPolicy: "AllKeysLRU",
    persistence: { rdbEnabled: true, rdbFrequency: "12h" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseDatabasesUpdateClusteringOnNoClusterCache();
  await redisEnterpriseDatabasesUpdate();
}

main().catch(console.error);
