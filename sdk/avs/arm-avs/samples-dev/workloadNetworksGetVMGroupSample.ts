// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a WorkloadNetworkVMGroup
 *
 * @summary get a WorkloadNetworkVMGroup
 * x-ms-original-file: 2025-09-01/WorkloadNetworks_GetVMGroup.json
 */
async function workloadNetworksGetVMGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.getVMGroup("group1", "cloud1", "vmGroup1");
  console.log(result);
}

async function main(): Promise<void> {
  await workloadNetworksGetVMGroup();
}

main().catch(console.error);
