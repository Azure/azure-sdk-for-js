// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to executes a privileged or administrative action on the specified Pipeline.
 *
 * @summary executes a privileged or administrative action on the specified Pipeline.
 * x-ms-original-file: 2026-02-06-preview/executeAction.json
 */
async function executesActionForAPipeline() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.pipelines.executeAction("testRG", "testPipeline", {
    actionType: "ForceDisable",
    targetType: "Connection",
    targets: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.AzureDataTransfer/connections/testConnection",
    ],
  });
  console.log(result);
}

async function main() {
  await executesActionForAPipeline();
}

main().catch(console.error);
