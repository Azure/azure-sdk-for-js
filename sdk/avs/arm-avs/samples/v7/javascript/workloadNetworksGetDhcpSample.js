// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a WorkloadNetworkDhcp
 *
 * @summary get a WorkloadNetworkDhcp
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_GetDhcp.json
 */
async function workloadNetworksGetDhcp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.getDhcp("group1", "dhcp1", "cloud1");
  console.log(result);
}

async function main() {
  await workloadNetworksGetDhcp();
}

main().catch(console.error);
