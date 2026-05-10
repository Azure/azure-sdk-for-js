// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get managed database schema
 *
 * @summary get managed database schema
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseSchemaGet.json
 */
async function getManagedDatabaseSchema(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabaseSchemas.get(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
    "dbo",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getManagedDatabaseSchema();
}

main().catch(console.error);
