// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a EdgeDevice
 *
 * @summary Get a EdgeDevice
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/GetEdgeDevices.json
 */
async function getEdgeDevice(): Promise<void> {
  const resourceUri =
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1";
  const edgeDeviceName = "default";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential);
  const result = await client.edgeDevices.get(resourceUri, edgeDeviceName);
  console.log(result);
}

async function main(): Promise<void> {
  await getEdgeDevice();
}

main().catch(console.error);
