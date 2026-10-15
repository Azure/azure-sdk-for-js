// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Flows associated with the specified Pipeline.
 *
 * @summary lists all Flows associated with the specified Pipeline.
 * x-ms-original-file: 2026-02-06-preview/listFlowsByPipeline.json
 */
async function listsFlowsForAPipeline(): Promise<void> {
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

async function main(): Promise<void> {
  await listsFlowsForAPipeline();
}

main().catch(console.error);
