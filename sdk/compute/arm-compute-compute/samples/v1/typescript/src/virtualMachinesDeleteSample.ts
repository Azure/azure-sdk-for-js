// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a virtual machine.
 *
 * @summary the operation to delete a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Delete_Force.json
 */
async function forceDeleteAVM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.delete("myResourceGroup", "myVM", {
    forceDeletion: true,
  });
}

async function main(): Promise<void> {
  await forceDeleteAVM();
}

main().catch(console.error);
