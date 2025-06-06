// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to perform failover action on Autonomous Database
 *
 * @summary perform failover action on Autonomous Database
 * x-ms-original-file: 2025-03-01/autonomousDatabase_failover.json
 */
async function autonomousDatabasesFailover() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.failover("rg000", "databasedb1", {
    peerDbId: "peerDbId",
  });
  console.log(result);
}

async function main() {
  await autonomousDatabasesFailover();
}

main().catch(console.error);
