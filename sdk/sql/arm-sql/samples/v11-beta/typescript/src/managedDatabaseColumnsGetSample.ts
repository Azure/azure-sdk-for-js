// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get managed database column
 *
 * @summary get managed database column
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseColumnGet.json
 */
async function getManagedDatabaseColumn(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabaseColumns.get(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
    "dbo",
    "table1",
    "column1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getManagedDatabaseColumn();
}

main().catch(console.error);
