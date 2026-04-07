// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a recoverable managed database.
 *
 * @summary gets a recoverable managed database.
 * x-ms-original-file: 2025-02-01-preview/GetRecoverableManagedDatabase.json
 */
async function getsARecoverableDatabasesByManagedInstances(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.recoverableManagedDatabases.get("Test1", "managedInstance", "testdb");
  console.log(result);
}

async function main(): Promise<void> {
  await getsARecoverableDatabasesByManagedInstances();
}

main().catch(console.error);
