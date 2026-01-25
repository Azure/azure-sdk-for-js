// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a EdgeDevice
 *
 * @summary delete a EdgeDevice
 * x-ms-original-file: 2025-12-01-preview/DeleteEdgeDevices.json
 */
async function deleteEdgeDevices() {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential);
  await client.edgeDevices.delete(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1",
    "default",
  );
}

async function main() {
  await deleteEdgeDevices();
}

main().catch(console.error);
