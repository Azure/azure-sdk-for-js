// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list EdgeDevice resources by parent
 *
 * @summary list EdgeDevice resources by parent
 * x-ms-original-file: 2025-12-01-preview/ListEdgeDevices.json
 */
async function listEdgeDevices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential);
  const resArray = new Array();
  for await (const item of client.edgeDevices.list(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listEdgeDevices();
}

main().catch(console.error);
