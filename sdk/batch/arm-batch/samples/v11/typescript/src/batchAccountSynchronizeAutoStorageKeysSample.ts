// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to synchronizes access keys for the auto-storage account configured for the specified Batch account, only if storage key authentication is being used.
 *
 * @summary synchronizes access keys for the auto-storage account configured for the specified Batch account, only if storage key authentication is being used.
 * x-ms-original-file: 2025-06-01/BatchAccountSynchronizeAutoStorageKeys.json
 */
async function batchAccountSynchronizeAutoStorageKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  await client.batchAccount.synchronizeAutoStorageKeys(
    "default-azurebatch-japaneast",
    "sampleacct",
  );
}

async function main(): Promise<void> {
  await batchAccountSynchronizeAutoStorageKeys();
}

main().catch(console.error);
