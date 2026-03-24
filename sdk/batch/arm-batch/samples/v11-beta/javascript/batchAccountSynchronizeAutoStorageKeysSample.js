// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to synchronizes access keys for the auto-storage account configured for the specified Batch account, only if storage key authentication is being used.
 *
 * @summary synchronizes access keys for the auto-storage account configured for the specified Batch account, only if storage key authentication is being used.
 * x-ms-original-file: 2025-06-01/BatchAccountSynchronizeAutoStorageKeys.json
 */
async function batchAccountSynchronizeAutoStorageKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  await client.batchAccount.synchronizeAutoStorageKeys(
    "default-azurebatch-japaneast",
    "sampleacct",
  );
}

async function main() {
  await batchAccountSynchronizeAutoStorageKeys();
}

main().catch(console.error);
