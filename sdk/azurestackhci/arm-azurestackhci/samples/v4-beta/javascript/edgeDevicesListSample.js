// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list EdgeDevice resources by parent
 *
 * @summary list EdgeDevice resources by parent
 * x-ms-original-file: 2025-12-01-preview/ListEdgeDevices.json
 */
async function listEdgeDevices() {
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

async function main() {
  await listEdgeDevices();
}

main().catch(console.error);
