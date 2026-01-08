// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list WorkloadNetworkDnsZone resources by WorkloadNetwork
 *
 * @summary list WorkloadNetworkDnsZone resources by WorkloadNetwork
 * x-ms-original-file: 2025-09-01/WorkloadNetworks_ListDnsZones.json
 */
async function workloadNetworksListDnsZones() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workloadNetworks.listDnsZones("group1", "cloud1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workloadNetworksListDnsZones();
}

main().catch(console.error);
