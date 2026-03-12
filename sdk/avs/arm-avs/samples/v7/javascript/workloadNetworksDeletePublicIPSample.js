// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a WorkloadNetworkPublicIP
 *
 * @summary delete a WorkloadNetworkPublicIP
 * x-ms-original-file: 2025-09-01/WorkloadNetworks_DeletePublicIP.json
 */
async function workloadNetworksDeletePublicIP() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.workloadNetworks.deletePublicIP("group1", "publicIP1", "cloud1");
}

async function main() {
  await workloadNetworksDeletePublicIP();
}

main().catch(console.error);
