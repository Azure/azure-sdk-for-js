// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a WorkloadNetworkVMGroup
 *
 * @summary get a WorkloadNetworkVMGroup
 * x-ms-original-file: 2025-09-01/WorkloadNetworks_GetVMGroup.json
 */
async function workloadNetworksGetVMGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.getVMGroup("group1", "cloud1", "vmGroup1");
  console.log(result);
}

async function main() {
  await workloadNetworksGetVMGroup();
}

main().catch(console.error);
