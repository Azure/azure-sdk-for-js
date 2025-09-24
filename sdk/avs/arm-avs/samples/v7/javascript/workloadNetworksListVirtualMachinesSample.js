// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list WorkloadNetworkVirtualMachine resources by WorkloadNetwork
 *
 * @summary list WorkloadNetworkVirtualMachine resources by WorkloadNetwork
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_ListVirtualMachines.json
 */
async function workloadNetworksListVirtualMachines() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workloadNetworks.listVirtualMachines("group1", "cloud1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workloadNetworksListVirtualMachines();
}

main().catch(console.error);
