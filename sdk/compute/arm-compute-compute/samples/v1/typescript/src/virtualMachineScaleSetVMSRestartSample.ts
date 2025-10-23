// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restarts a virtual machine in a VM scale set.
 *
 * @summary restarts a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Restart_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMRestartMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.restart(
    "rgcompute",
    "aa",
    "aaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to restarts a virtual machine in a VM scale set.
 *
 * @summary restarts a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Restart_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMRestartMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.restart(
    "rgcompute",
    "aaaaaaaaaaaa",
    "aaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetVMRestartMaximumSetGen();
  await virtualMachineScaleSetVMRestartMinimumSetGen();
}

main().catch(console.error);
