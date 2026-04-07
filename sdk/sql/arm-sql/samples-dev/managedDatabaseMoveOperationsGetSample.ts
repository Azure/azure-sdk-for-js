// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a managed database move operation.
 *
 * @summary gets a managed database move operation.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseMoveOperationResultGet.json
 */
async function getsAManagedDatabaseMoveOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabaseMoveOperations.get(
    "rg1",
    "westeurope",
    "15961324-d809-46ed-86b9-d786953140e2",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAManagedDatabaseMoveOperation();
}

main().catch(console.error);
