// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a WorkloadNetworkPortMirroring
 *
 * @summary delete a WorkloadNetworkPortMirroring
 * x-ms-original-file: 2025-09-01/WorkloadNetworks_DeletePortMirroring.json
 */
async function workloadNetworksDeletePortMirroring() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.workloadNetworks.deletePortMirroring("group1", "portMirroring1", "cloud1");
}

async function main() {
  await workloadNetworksDeletePortMirroring();
}

main().catch(console.error);
