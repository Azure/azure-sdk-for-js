// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a WorkloadNetworkVMGroup
 *
 * @summary delete a WorkloadNetworkVMGroup
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_DeleteVMGroup.json
 */
async function workloadNetworksDeleteVMGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.workloadNetworks.deleteVMGroup("group1", "vmGroup1", "cloud1");
}

async function main() {
  await workloadNetworksDeleteVMGroup();
}

main().catch(console.error);
