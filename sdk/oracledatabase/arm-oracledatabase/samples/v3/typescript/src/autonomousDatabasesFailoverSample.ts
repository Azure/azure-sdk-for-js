// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to perform failover action on Autonomous Database
 *
 * @summary perform failover action on Autonomous Database
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_Failover_MaximumSet_Gen.json
 */
async function performFailoverActionOnAutonomousDatabaseGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.failover("rgopenapi", "databasedb1*", {
    peerDbId: "peerDbId",
    peerDbOcid: "yozpqyefqhirkybmzwgoidyl",
    peerDbLocation: "cxlzbzbfzi",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to perform failover action on Autonomous Database
 *
 * @summary perform failover action on Autonomous Database
 * x-ms-original-file: 2025-09-01/autonomousDatabase_failover.json
 */
async function autonomousDatabasesFailover(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.failover("rg000", "databasedb1", {
    peerDbId: "peerDbId",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await performFailoverActionOnAutonomousDatabaseGeneratedByMaximumSetRule();
  await autonomousDatabasesFailover();
}

main().catch(console.error);
