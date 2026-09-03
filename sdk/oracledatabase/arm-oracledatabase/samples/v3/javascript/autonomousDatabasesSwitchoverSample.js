// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to perform switchover action on Autonomous Database
 *
 * @summary perform switchover action on Autonomous Database
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_Switchover_MaximumSet_Gen.json
 */
async function performSwitchoverActionOnAutonomousDatabaseGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.switchover("rgopenapi", "databasedb1", {
    peerDbId: "peerDbId",
    peerDbOcid: "yozpqyefqhirkybmzwgoidyl",
    peerDbLocation: "cxlzbzbfzi",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to perform switchover action on Autonomous Database
 *
 * @summary perform switchover action on Autonomous Database
 * x-ms-original-file: 2025-09-01/autonomousDatabase_switchover.json
 */
async function autonomousDatabasesSwitchover() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.switchover("rg000", "databasedb1", {
    peerDbId: "peerDbId",
  });
  console.log(result);
}

async function main() {
  await performSwitchoverActionOnAutonomousDatabaseGeneratedByMaximumSetRule();
  await autonomousDatabasesSwitchover();
}

main().catch(console.error);
