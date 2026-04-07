// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels the asynchronous operation on the managed instance.
 *
 * @summary cancels the asynchronous operation on the managed instance.
 * x-ms-original-file: 2025-02-01-preview/CancelManagedInstanceOperation.json
 */
async function cancelTheManagedInstanceManagementOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedInstanceOperations.cancel(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "11111111-1111-1111-1111-111111111111",
  );
}

async function main(): Promise<void> {
  await cancelTheManagedInstanceManagementOperation();
}

main().catch(console.error);
