// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops data transfer through the specified storage transfer flow.
 *
 * @summary stops data transfer through the specified storage transfer flow.
 * x-ms-original-file: 2026-06-29-preview/disableTransferStorageTransferFlow.json
 */
async function stopsDataTransferThroughTheStorageTransferFlow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.storageTransferFlows.disableTransfer(
    "testRG",
    "testStorageTransferFlow",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stopsDataTransferThroughTheStorageTransferFlow();
}

main().catch(console.error);
