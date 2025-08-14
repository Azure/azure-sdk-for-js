// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the list of GuestAgent of the given vm.
 *
 * @summary returns the list of GuestAgent of the given vm.
 * x-ms-original-file: 2025-06-01-preview/GuestAgents_ListByVirtualMachineInstance.json
 */
async function guestAgentListByVirtualMachineInstances(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.guestAgents.listByVirtualMachineInstance(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await guestAgentListByVirtualMachineInstances();
}

main().catch(console.error);
