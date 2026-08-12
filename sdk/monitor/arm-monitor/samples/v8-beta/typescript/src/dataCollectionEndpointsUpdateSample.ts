// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates part of a data collection endpoint.
 *
 * @summary updates part of a data collection endpoint.
 * x-ms-original-file: 2024-03-11/DataCollectionEndpointsPatch.json
 */
async function updateDataCollectionEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.dataCollectionEndpoints.update(
    "myResourceGroup",
    "myDataCollectionEndpoint",
    { body: { tags: { tag1: "A" } } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateDataCollectionEndpoint();
}

main().catch(console.error);
