// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a NeonDatabase
 *
 * @summary delete a NeonDatabase
 * x-ms-original-file: 2025-06-23-preview/NeonDatabases_Delete_MaximumSet_Gen.json
 */
async function neonDatabasesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  await client.neonDatabases.delete(
    "rgneon",
    "myOrganization",
    "myProject",
    "feature",
    "postgres_main_db",
  );
}

async function main(): Promise<void> {
  await neonDatabasesDeleteMaximumSet();
}

main().catch(console.error);
