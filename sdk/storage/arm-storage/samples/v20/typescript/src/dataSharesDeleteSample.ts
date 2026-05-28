// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Storage DataShare.
 *
 * @summary delete a Storage DataShare.
 * x-ms-original-file: 2025-08-01/StorageDataShareCRUD/StorageDataShares_Delete.json
 */
async function deleteDataShare(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.dataShares.delete("testrg", "teststorageaccount", "testdatashare");
}

async function main(): Promise<void> {
  await deleteDataShare();
}

main().catch(console.error);
