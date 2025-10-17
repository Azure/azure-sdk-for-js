// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a VM scale set.
 *
 * @summary deletes a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Delete_Force.json
 */
async function forceDeleteAVMScaleSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.delete("myResourceGroup", "myvmScaleSet", {
    forceDeletion: true,
  });
}

async function main(): Promise<void> {
  await forceDeleteAVMScaleSet();
}

main().catch(console.error);
