// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a WorkloadNetworkDnsZone
 *
 * @summary delete a WorkloadNetworkDnsZone
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_DeleteDnsZone.json
 */
async function workloadNetworksDeleteDnsZone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.workloadNetworks.deleteDnsZone("group1", "dnsZone1", "cloud1");
}

async function main() {
  await workloadNetworksDeleteDnsZone();
}

main().catch(console.error);
