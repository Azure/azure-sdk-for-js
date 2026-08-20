// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a data collection endpoint.
 *
 * @summary deletes a data collection endpoint.
 * x-ms-original-file: 2024-03-11/DataCollectionEndpointsDelete.json
 */
async function deleteDataCollectionEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  await client.dataCollectionEndpoints.delete("myResourceGroup", "myDataCollectionEndpoint");
}

async function main(): Promise<void> {
  await deleteDataCollectionEndpoint();
}

main().catch(console.error);
