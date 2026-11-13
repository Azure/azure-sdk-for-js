// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the storage transfer flow resource.
 *
 * @summary deletes the storage transfer flow resource.
 * x-ms-original-file: 2026-06-29-preview/deleteStorageTransferFlow.json
 */
async function deletesTheStorageTransferFlow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.storageTransferFlows.delete("testRG", "testStorageTransferFlow");
}

async function main(): Promise<void> {
  await deletesTheStorageTransferFlow();
}

main().catch(console.error);
