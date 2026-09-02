// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to migrates one or more virtual machines in a VM scale set to an availability zone.
 *
 * @summary migrates one or more virtual machines in a VM scale set to an availability zone.
 * x-ms-original-file: 2026-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_MigrateVMAvailabilityZone.json
 */
async function virtualMachineScaleSetMigrateVMAvailabilityZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.migrateVMAvailabilityZone("myResourceGroup", "{vmss-name}", {
    instanceIds: ["0", "1", "2"],
    targetZone: "2",
  });
}

async function main(): Promise<void> {
  await virtualMachineScaleSetMigrateVMAvailabilityZone();
}

main().catch(console.error);
