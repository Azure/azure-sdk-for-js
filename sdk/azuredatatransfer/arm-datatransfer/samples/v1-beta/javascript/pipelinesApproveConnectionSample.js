// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to approves a pending connection request associated with the specified Pipeline.
 *
 * @summary approves a pending connection request associated with the specified Pipeline.
 * x-ms-original-file: 2026-02-06-preview/approveConnection.json
 */
async function approvesTheSpecifiedConnectionInAPipeline() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.pipelines.approveConnection("testRG", "testPipeline", {
    id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.AzureDataTransfer/connections/testConnection",
    statusReason: "Example reason",
  });
  console.log(result);
}

async function main() {
  await approvesTheSpecifiedConnectionInAPipeline();
}

main().catch(console.error);
