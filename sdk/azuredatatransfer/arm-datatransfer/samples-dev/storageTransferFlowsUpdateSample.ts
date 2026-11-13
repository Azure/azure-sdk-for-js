// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the StorageTransferFlow resource.
 *
 * @summary updates the StorageTransferFlow resource.
 * x-ms-original-file: 2026-06-29-preview/patchStorageTransferFlow.json
 */
async function updatesTheStorageTransferFlow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.storageTransferFlows.update("testRG", "testStorageTransferFlow", {
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatesTheStorageTransferFlow();
}

main().catch(console.error);
