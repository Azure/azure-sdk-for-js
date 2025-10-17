// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a virtual machine in a VM scale set.
 *
 * @summary starts a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Start_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMStartMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.start(
    "rgcompute",
    "aaaaaaaaaaaaaa",
    "aaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to starts a virtual machine in a VM scale set.
 *
 * @summary starts a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Start_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMStartMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.start(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetVMStartMaximumSetGen();
  await virtualMachineScaleSetVMStartMinimumSetGen();
}

main().catch(console.error);
