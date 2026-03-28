// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to upgrades the database Redis version to the latest available.
 *
 * @summary upgrades the database Redis version to the latest available.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesUpgradeDBRedisVersion.json
 */
async function howToUpgradeYourDatabaseRedisVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.databases.upgradeDBRedisVersion("rg1", "cache1", "default");
}

async function main(): Promise<void> {
  await howToUpgradeYourDatabaseRedisVersion();
}

main().catch(console.error);
