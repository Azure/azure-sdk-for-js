// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a data collection endpoint.
 *
 * @summary creates or updates a data collection endpoint.
 * x-ms-original-file: 2024-03-11/DataCollectionEndpointsCreate.json
 */
async function createADataCollectionEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.dataCollectionEndpoints.create(
    "myResourceGroup",
    "myDataCollectionEndpoint",
    { body: { location: "eastus", networkAcls: { publicNetworkAccess: "Enabled" } } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a data collection endpoint.
 *
 * @summary creates or updates a data collection endpoint.
 * x-ms-original-file: 2024-03-11/DataCollectionEndpointsUpdate.json
 */
async function updateADataCollectionEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.dataCollectionEndpoints.create(
    "myResourceGroup",
    "myDataCollectionEndpoint",
    { body: { location: "eastus", tags: { tag1: "A", tag2: "B", tag3: "C" } } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createADataCollectionEndpoint();
  await updateADataCollectionEndpoint();
}

main().catch(console.error);
