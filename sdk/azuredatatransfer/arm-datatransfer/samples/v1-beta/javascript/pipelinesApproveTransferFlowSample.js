// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to approves pending flow request(s) associated with the specified Pipeline.
 *
 * @summary approves pending flow request(s) associated with the specified Pipeline.
 * x-ms-original-file: 2026-06-29-preview/approveTransferFlow.json
 */
async function approvesPendingTransferFlowRequestsInAPipeline() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.pipelines.approveTransferFlow("testRG", "testPipeline", {
    id: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.AzureDataTransfer/storageTransferFlows/testStorageTransferFlow",
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.AzureDataTransfer/messagingTransferFlows/testMessagingTransferFlow",
    ],
    statusReason: "Example reason",
  });
  console.log(result);
}

async function main() {
  await approvesPendingTransferFlowRequestsInAPipeline();
}

main().catch(console.error);
