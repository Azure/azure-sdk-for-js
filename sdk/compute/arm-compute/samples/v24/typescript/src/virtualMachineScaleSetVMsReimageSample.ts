// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reimages (upgrade the operating system) a specific virtual machine in a VM scale set.
 *
 * @summary reimages (upgrade the operating system) a specific virtual machine in a VM scale set.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Reimage_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMReimageMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMs.reimage(
    "rgcompute",
    "aaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    { vmScaleSetVMReimageInput: { forceUpdateOSDiskForEphemeral: true, tempDisk: true } },
  );
}

/**
 * This sample demonstrates how to reimages (upgrade the operating system) a specific virtual machine in a VM scale set.
 *
 * @summary reimages (upgrade the operating system) a specific virtual machine in a VM scale set.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Reimage_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMReimageMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMs.reimage("rgcompute", "aaaaaaa", "aaaaaaaaaaaaa");
}

async function main(): Promise<void> {
  await virtualMachineScaleSetVMReimageMaximumSetGen();
  await virtualMachineScaleSetVMReimageMinimumSetGen();
}

main().catch(console.error);
