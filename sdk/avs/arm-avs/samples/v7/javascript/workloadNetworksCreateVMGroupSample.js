// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a WorkloadNetworkVMGroup
 *
 * @summary create a WorkloadNetworkVMGroup
 * x-ms-original-file: 2025-09-01/WorkloadNetworks_CreateVMGroup.json
 */
async function workloadNetworksCreateVMGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.createVMGroup("group1", "cloud1", "vmGroup1", {
    properties: {
      displayName: "vmGroup1",
      members: ["564d43da-fefc-2a3b-1d92-42855622fa50"],
      revision: 1,
    },
  });
  console.log(result);
}

async function main() {
  await workloadNetworksCreateVMGroup();
}

main().catch(console.error);
