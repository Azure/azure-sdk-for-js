// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a EdgeDeviceJob
 *
 * @summary delete a EdgeDeviceJob
 * x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_Delete.json
 */
async function edgeDeviceJobsDelete() {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential);
  await client.edgeDeviceJobs.delete(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1",
    "lAq",
    "Ihlm3R-bZ4vTC4ABA456",
  );
}

async function main() {
  await edgeDeviceJobsDelete();
}

main().catch(console.error);
