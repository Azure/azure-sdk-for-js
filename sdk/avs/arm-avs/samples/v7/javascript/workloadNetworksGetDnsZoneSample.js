// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a WorkloadNetworkDnsZone
 *
 * @summary get a WorkloadNetworkDnsZone
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_GetDnsZone.json
 */
async function workloadNetworksGetDnsZone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.getDnsZone("group1", "cloud1", "dnsZone1");
  console.log(result);
}

async function main() {
  await workloadNetworksGetDnsZone();
}

main().catch(console.error);
