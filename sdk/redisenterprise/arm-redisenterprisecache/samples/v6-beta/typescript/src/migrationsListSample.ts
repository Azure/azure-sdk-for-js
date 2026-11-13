// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about all migrations attempts in a Redis Enterprise cluster.
 *
 * @summary gets information about all migrations attempts in a Redis Enterprise cluster.
 * x-ms-original-file: 2026-10-01-preview/RedisEnterpriseMigrationList.json
 */
async function redisEnterpriseMigrationList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.migrations.list("rg1", "cache1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await redisEnterpriseMigrationList();
}

main().catch(console.error);
