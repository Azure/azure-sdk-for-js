// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a WorkloadNetworkSegment
 *
 * @summary get a WorkloadNetworkSegment
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_GetSegment.json
 */
async function workloadNetworksGetSegment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.getSegment("group1", "cloud1", "segment1");
  console.log(result);
}

async function main() {
  await workloadNetworksGetSegment();
}

main().catch(console.error);
