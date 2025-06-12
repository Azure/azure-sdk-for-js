// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a WorkloadNetworkPublicIP
 *
 * @summary delete a WorkloadNetworkPublicIP
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_DeletePublicIP.json
 */
async function workloadNetworksDeletePublicIP(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.workloadNetworks.deletePublicIP("group1", "publicIP1", "cloud1");
}

async function main(): Promise<void> {
  await workloadNetworksDeletePublicIP();
}

main().catch(console.error);
