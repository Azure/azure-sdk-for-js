// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a EdgeDeviceJob
 *
 * @summary get a EdgeDeviceJob
 * x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_Get_RemoteSupport.json
 */
async function edgeDeviceJobsGetRemoteSupport() {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential);
  const result = await client.edgeDeviceJobs.get(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1",
    "-5M1G7G10OZ-o5b-HS3-c72",
    "-oUxs",
  );
  console.log(result);
}

async function main() {
  await edgeDeviceJobsGetRemoteSupport();
}

main().catch(console.error);
