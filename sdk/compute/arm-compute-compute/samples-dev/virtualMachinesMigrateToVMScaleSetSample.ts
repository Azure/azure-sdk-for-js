// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to migrate a virtual machine from availability set to Flexible Virtual Machine Scale Set.
 *
 * @summary migrate a virtual machine from availability set to Flexible Virtual Machine Scale Set.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_MigrateToVirtualMachineScaleSet.json
 */
async function migrateAVirtualMachineToFlexibleVirtualMachineScaleSer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachines.migrateToVMScaleSet("myResourceGroup", "myVMName", {
    parameters: { targetFaultDomain: 0, targetVMSize: "Standard_D1_v2" },
  });
}

async function main(): Promise<void> {
  await migrateAVirtualMachineToFlexibleVirtualMachineScaleSer();
}

main().catch(console.error);
