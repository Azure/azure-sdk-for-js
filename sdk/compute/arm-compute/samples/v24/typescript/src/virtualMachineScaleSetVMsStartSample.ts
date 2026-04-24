// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a virtual machine in a VM scale set.
 *
 * @summary starts a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Start_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMStartMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMs.start("rgcompute", "aaaaaaaaaaaaaa", "aaaaaaaaaaaaa");
}

/**
 * This sample demonstrates how to starts a virtual machine in a VM scale set.
 *
 * @summary starts a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Start_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMStartMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMs.start(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaa",
  );
}

async function main(): Promise<void> {
  await virtualMachineScaleSetVMStartMaximumSetGen();
  await virtualMachineScaleSetVMStartMinimumSetGen();
}

main().catch(console.error);
