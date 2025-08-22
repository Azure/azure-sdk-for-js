// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a WorkloadNetworkVMGroup
 *
 * @summary delete a WorkloadNetworkVMGroup
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_DeleteVMGroup.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function workloadNetworksDeleteVMGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.workloadNetworks.deleteVMGroup("group1", "vmGroup1", "cloud1");
}

async function main(): Promise<void> {
  await workloadNetworksDeleteVMGroup();
}

main().catch(console.error);
