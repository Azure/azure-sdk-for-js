// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a WorkloadNetworkSegment
 *
 * @summary delete a WorkloadNetworkSegment
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_DeleteSegment.json
 */
async function workloadNetworksDeleteSegment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.workloadNetworks.deleteSegment("group1", "cloud1", "segment1");
}

async function main() {
  await workloadNetworksDeleteSegment();
}

main().catch(console.error);
