// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets managed database restore details.
 *
 * @summary gets managed database restore details.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseRestoreDetails.json
 */
async function managedDatabaseRestoreDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabaseRestoreDetails.get(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "testdb",
    "Default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await managedDatabaseRestoreDetails();
}

main().catch(console.error);
