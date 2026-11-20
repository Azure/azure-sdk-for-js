// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to rejects pending flow request(s) associated with the specified Pipeline.
 *
 * @summary rejects pending flow request(s) associated with the specified Pipeline.
 * x-ms-original-file: 2026-06-29-preview/rejectTransferFlow.json
 */
async function rejectsPendingTransferFlowRequestsInAPipeline(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.pipelines.rejectTransferFlow("testRG", "testPipeline", {
    id: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.AzureDataTransfer/storageTransferFlows/testStorageTransferFlow",
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.AzureDataTransfer/messagingTransferFlows/testMessagingTransferFlow",
    ],
    statusReason: "Example reason",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await rejectsPendingTransferFlowRequestsInAPipeline();
}

main().catch(console.error);
