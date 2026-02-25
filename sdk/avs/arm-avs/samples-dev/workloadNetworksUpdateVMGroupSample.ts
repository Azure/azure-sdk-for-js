// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a WorkloadNetworkVMGroup
 *
 * @summary update a WorkloadNetworkVMGroup
 * x-ms-original-file: 2025-09-01/WorkloadNetworks_UpdateVMGroup.json
 */
async function workloadNetworksUpdateVMGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.updateVMGroup("group1", "cloud1", "vmGroup1", {
    properties: { members: ["564d43da-fefc-2a3b-1d92-42855622fa50"], revision: 1 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workloadNetworksUpdateVMGroup();
}

main().catch(console.error);
