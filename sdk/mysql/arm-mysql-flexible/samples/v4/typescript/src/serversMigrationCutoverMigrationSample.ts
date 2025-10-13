// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cutover migration for MySQL import, it will switch source elastic server DNS to flexible server.
 *
 * @summary cutover migration for MySQL import, it will switch source elastic server DNS to flexible server.
 * x-ms-original-file: 2024-12-30/CutoverMigration.json
 */
async function cutoverMigrationForMySQLImport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.serversMigration.cutoverMigration("testrg", "mysqltestserver");
  console.log(result);
}

async function main(): Promise<void> {
  await cutoverMigrationForMySQLImport();
}

main().catch(console.error);
