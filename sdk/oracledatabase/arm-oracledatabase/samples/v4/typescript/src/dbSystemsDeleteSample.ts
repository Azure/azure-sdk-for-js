// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a DbSystem
 *
 * @summary delete a DbSystem
 * x-ms-original-file: 2025-09-01/DbSystems_Delete_MaximumSet_Gen.json
 */
async function dbSystemsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.dbSystems.delete("rgopenapi", "dbsystem1");
}

/**
 * This sample demonstrates how to delete a DbSystem
 *
 * @summary delete a DbSystem
 * x-ms-original-file: 2025-09-01/DbSystems_Delete_MinimumSet_Gen.json
 */
async function dbSystemsDeleteMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.dbSystems.delete("rgopenapi", "dbsystem1");
}

async function main(): Promise<void> {
  await dbSystemsDeleteMaximumSet();
  await dbSystemsDeleteMinimumSet();
}

main().catch(console.error);
