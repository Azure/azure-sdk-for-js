// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Flows associated with the specified Pipeline.
 *
 * @summary lists all Flows associated with the specified Pipeline.
 * x-ms-original-file: 2026-02-06-preview/listFlowsByPipeline.json
 */
async function listsFlowsForAPipeline() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.pipelines.list("testRG", "testPipeline", {
    connections: {
      value: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.AzureDataTransfer/connections/testConnection",
      ],
    },
  });
  console.log(result);
}

async function main() {
  await listsFlowsForAPipeline();
}

main().catch(console.error);
