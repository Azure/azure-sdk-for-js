// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specified share under its account.
 *
 * @summary deletes specified share under its account.
 * x-ms-original-file: 2026-04-01/FileSharesDelete.json
 */
async function deleteShares(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.fileShares.delete("res4079", "sto4506", "share9689");
}

async function main(): Promise<void> {
  await deleteShares();
}

main().catch(console.error);
