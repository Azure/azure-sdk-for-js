// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a WorkloadNetworkDnsService
 *
 * @summary delete a WorkloadNetworkDnsService
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_DeleteDnsService.json
 */
async function workloadNetworksDeleteDnsService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.workloadNetworks.deleteDnsService("group1", "dnsService1", "cloud1");
}

async function main() {
  await workloadNetworksDeleteDnsService();
}

main().catch(console.error);
