// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restores an Autonomous Database based on the provided request parameters.
 *
 * @summary restores an Autonomous Database based on the provided request parameters.
 * x-ms-original-file: 2025-03-01/autonomousDatabase_restore.json
 */
async function autonomousDatabasesRestore(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.restore("rg000", "databasedb1", {
    timestamp: new Date("2024-04-23T00:00:00.000Z"),
  });
  console.log(result);
}

async function main(): Promise<void> {
  await autonomousDatabasesRestore();
}

main().catch(console.error);
