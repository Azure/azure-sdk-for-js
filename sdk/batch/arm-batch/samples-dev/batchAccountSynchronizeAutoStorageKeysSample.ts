// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Synchronizes access keys for the auto-storage account configured for the specified Batch account, only if storage key authentication is being used.
 *
 * @summary Synchronizes access keys for the auto-storage account configured for the specified Batch account, only if storage key authentication is being used.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2024-07-01/examples/BatchAccountSynchronizeAutoStorageKeys.json
 */

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function batchAccountSynchronizeAutoStorageKeys(): Promise<void> {
  const subscriptionId = process.env["BATCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["BATCH_RESOURCE_GROUP"] || "default-azurebatch-japaneast";
  const accountName = "sampleacct";
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccountOperations.synchronizeAutoStorageKeys(
    resourceGroupName,
    accountName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await batchAccountSynchronizeAutoStorageKeys();
}

main().catch(console.error);
