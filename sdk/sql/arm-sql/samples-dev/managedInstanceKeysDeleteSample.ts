// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the managed instance key with the given name.
 *
 * @summary deletes the managed instance key with the given name.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceKeyDelete.json
 */
async function deleteTheManagedInstanceKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedInstanceKeys.delete(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "someVault_someKey_01234567890123456789012345678901",
  );
}

async function main(): Promise<void> {
  await deleteTheManagedInstanceKey();
}

main().catch(console.error);
