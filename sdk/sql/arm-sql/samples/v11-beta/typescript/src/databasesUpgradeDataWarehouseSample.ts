// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to upgrades a data warehouse.
 *
 * @summary upgrades a data warehouse.
 * x-ms-original-file: 2025-02-01-preview/UpgradeDataWarehouse.json
 */
async function upgradesADataWarehouse(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.databases.upgradeDataWarehouse("Default-SQL-SouthEastAsia", "testsvr", "testdwdb");
}

async function main(): Promise<void> {
  await upgradesADataWarehouse();
}

main().catch(console.error);
