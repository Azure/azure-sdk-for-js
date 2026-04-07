// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get query by query id.
 *
 * @summary get query by query id.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceQueryGet.json
 */
async function obtainQueryProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabaseQueries.get(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "database_1",
    "42",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await obtainQueryProperties();
}

main().catch(console.error);
