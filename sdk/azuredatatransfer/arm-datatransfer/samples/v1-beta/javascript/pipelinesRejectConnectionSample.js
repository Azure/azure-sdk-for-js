// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to rejects a pending connection request associated with the specified Pipeline.
 *
 * @summary rejects a pending connection request associated with the specified Pipeline.
 * x-ms-original-file: 2026-02-06-preview/rejectConnection.json
 */
async function rejectsTheSpecifiedConnectionInAPipeline() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.pipelines.rejectConnection("testRG", "testPipeline", {
    id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.AzureDataTransfer/connections/testConnection",
    statusReason: "Example reason",
  });
  console.log(result);
}

async function main() {
  await rejectsTheSpecifiedConnectionInAPipeline();
}

main().catch(console.error);
