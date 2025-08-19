// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a database
 *
 * @summary Updates a database
 * x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/preview/2025-05-01-preview/examples/RedisEnterpriseDatabasesUpdate.json
 */

import {
  DatabaseUpdate,
  RedisEnterpriseManagementClient,
} from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function redisEnterpriseDatabasesUpdate(): Promise<void> {
  const subscriptionId =
    process.env["REDISENTERPRISE_SUBSCRIPTION_ID"] ||
    "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const resourceGroupName =
    process.env["REDISENTERPRISE_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cache1";
  const databaseName = "default";
  const parameters: DatabaseUpdate = {
    accessKeysAuthentication: "Enabled",
    clientProtocol: "Encrypted",
    evictionPolicy: "AllKeysLRU",
    persistence: { rdbEnabled: true, rdbFrequency: "12h" },
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisEnterpriseManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.databases.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates a database
 *
 * @summary Updates a database
 * x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/preview/2025-05-01-preview/examples/RedisEnterpriseDatabasesNoClusterCacheUpdateClustering.json
 */
async function redisEnterpriseDatabasesUpdateClusteringOnNoClusterCache(): Promise<void> {
  const subscriptionId =
    process.env["REDISENTERPRISE_SUBSCRIPTION_ID"] ||
    "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const resourceGroupName =
    process.env["REDISENTERPRISE_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cache1";
  const databaseName = "default";
  const parameters: DatabaseUpdate = {
    clientProtocol: "Encrypted",
    clusteringPolicy: "EnterpriseCluster",
    evictionPolicy: "NoEviction",
    port: 10000,
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisEnterpriseManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.databases.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    databaseName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseDatabasesUpdate();
  await redisEnterpriseDatabasesUpdateClusteringOnNoClusterCache();
}

main().catch(console.error);
