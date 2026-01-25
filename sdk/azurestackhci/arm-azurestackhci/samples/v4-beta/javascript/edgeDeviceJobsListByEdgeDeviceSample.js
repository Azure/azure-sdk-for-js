// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list EdgeDeviceJob resources by EdgeDevice
 *
 * @summary list EdgeDeviceJob resources by EdgeDevice
 * x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_ListByEdgeDevice.json
 */
async function edgeDeviceJobsListByEdgeDevice() {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential);
  const resArray = new Array();
  for await (const item of client.edgeDeviceJobs.listByEdgeDevice(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1",
    "YE-855IEIN585-",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await edgeDeviceJobsListByEdgeDevice();
}

main().catch(console.error);
