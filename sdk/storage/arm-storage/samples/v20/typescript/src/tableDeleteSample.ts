// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the table with the specified table name, under the specified account if it exists.
 *
 * @summary deletes the table with the specified table name, under the specified account if it exists.
 * x-ms-original-file: 2026-04-01/TableOperationDelete.json
 */
async function tableOperationDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.table.delete("res3376", "sto328", "table6185");
}

async function main(): Promise<void> {
  await tableOperationDelete();
}

main().catch(console.error);
