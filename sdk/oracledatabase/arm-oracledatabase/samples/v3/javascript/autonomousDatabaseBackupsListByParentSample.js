// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AutonomousDatabaseBackup resources by AutonomousDatabase
 *
 * @summary list AutonomousDatabaseBackup resources by AutonomousDatabase
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseBackups_ListByParent_MaximumSet_Gen.json
 */
async function listAutonomousDatabaseBackupsByAutonomousDatabaseGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabaseBackups.listByParent(
    "rgopenapi",
    "databasedb1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAutonomousDatabaseBackupsByAutonomousDatabaseGeneratedByMaximumSetRule();
}

main().catch(console.error);
