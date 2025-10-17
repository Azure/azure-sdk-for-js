// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a virtual machine from a VM scale set.
 *
 * @summary deletes a virtual machine from a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Delete_Force.json
 */
async function forceDeleteAVirtualMachineFromAVMScaleSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMS.delete("myResourceGroup", "myvmScaleSet", "0", {
    forceDeletion: true,
  });
}

async function main(): Promise<void> {
  await forceDeleteAVirtualMachineFromAVMScaleSet();
}

main().catch(console.error);
