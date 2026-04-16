// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to perform Lifecycle Management Action on Autonomous Database
 *
 * @summary perform Lifecycle Management Action on Autonomous Database
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_Action_MaximumSet_Gen.json
 */
async function autonomousDatabasesActionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.action("rgopenapi", "databasedb1", {
    action: "Start",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await autonomousDatabasesActionMaximumSet();
}

main().catch(console.error);
