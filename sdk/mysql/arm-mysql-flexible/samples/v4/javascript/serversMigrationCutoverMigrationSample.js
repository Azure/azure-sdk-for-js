// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cutover migration for MySQL import, it will switch source elastic server DNS to flexible server.
 *
 * @summary cutover migration for MySQL import, it will switch source elastic server DNS to flexible server.
 * x-ms-original-file: 2024-12-30/CutoverMigration.json
 */
async function cutoverMigrationForMySQLImport() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.serversMigration.cutoverMigration("testrg", "mysqltestserver");
  console.log(result);
}

async function main() {
  await cutoverMigrationForMySQLImport();
}

main().catch(console.error);
