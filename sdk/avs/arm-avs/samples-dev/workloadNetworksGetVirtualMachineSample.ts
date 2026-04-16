// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a WorkloadNetworkVirtualMachine
 *
 * @summary get a WorkloadNetworkVirtualMachine
 * x-ms-original-file: 2025-09-01/WorkloadNetworks_GetVirtualMachine.json
 */
async function workloadNetworksGetVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.getVirtualMachine("group1", "cloud1", "vm1");
  console.log(result);
}

async function main(): Promise<void> {
  await workloadNetworksGetVirtualMachine();
}

main().catch(console.error);
