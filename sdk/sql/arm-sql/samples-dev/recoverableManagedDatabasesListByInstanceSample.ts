// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of recoverable managed databases.
 *
 * @summary gets a list of recoverable managed databases.
 * x-ms-original-file: 2025-02-01-preview/ListRecoverableManagedDatabasesByServer.json
 */
async function listRecoverableDatabasesByManagedInstances(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recoverableManagedDatabases.listByInstance(
    "Test1",
    "managedInstance",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRecoverableDatabasesByManagedInstances();
}

main().catch(console.error);
