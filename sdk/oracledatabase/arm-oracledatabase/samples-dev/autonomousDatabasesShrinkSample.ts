// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation shrinks the current allocated storage down to the current actual used data storage.
 *
 * @summary this operation shrinks the current allocated storage down to the current actual used data storage.
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_Shrink_MaximumSet_Gen.json
 */
async function performShrinkActionOnAutonomousDatabaseGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.shrink("rgopenapi", "database1");
  console.log(result);
}

async function main(): Promise<void> {
  await performShrinkActionOnAutonomousDatabaseGeneratedByMaximumSetRule();
}

main().catch(console.error);
