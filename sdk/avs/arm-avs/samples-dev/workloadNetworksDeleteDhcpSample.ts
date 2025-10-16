// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a WorkloadNetworkDhcp
 *
 * @summary delete a WorkloadNetworkDhcp
 * x-ms-original-file: 2025-09-01/WorkloadNetworks_DeleteDhcp.json
 */
async function workloadNetworksDeleteDhcp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.workloadNetworks.deleteDhcp("group1", "cloud1", "dhcp1");
}

async function main(): Promise<void> {
  await workloadNetworksDeleteDhcp();
}

main().catch(console.error);
