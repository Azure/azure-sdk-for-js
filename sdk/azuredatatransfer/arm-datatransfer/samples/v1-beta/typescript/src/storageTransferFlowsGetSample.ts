// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets StorageTransferFlow resource.
 *
 * @summary gets StorageTransferFlow resource.
 * x-ms-original-file: 2026-06-29-preview/getStorageTransferFlow.json
 */
async function getsTheStorageTransferFlow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.storageTransferFlows.get("testRG", "testStorageTransferFlow");
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheStorageTransferFlow();
}

main().catch(console.error);
