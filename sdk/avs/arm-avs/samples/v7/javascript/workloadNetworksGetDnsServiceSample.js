// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a WorkloadNetworkDnsService
 *
 * @summary get a WorkloadNetworkDnsService
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_GetDnsService.json
 */
async function workloadNetworksGetDnsService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.getDnsService("group1", "cloud1", "dnsService1");
  console.log(result);
}

async function main() {
  await workloadNetworksGetDnsService();
}

main().catch(console.error);
