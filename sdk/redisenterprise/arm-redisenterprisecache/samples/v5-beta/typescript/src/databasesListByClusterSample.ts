// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all databases in the specified Redis Enterprise cluster.
 *
 * @summary gets all databases in the specified Redis Enterprise cluster.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesListByCluster.json
 */
async function redisEnterpriseDatabasesListByCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databases.listByCluster("rg1", "cache1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await redisEnterpriseDatabasesListByCluster();
}

main().catch(console.error);
