// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to simulate the eviction of spot virtual machine in a VM scale set.
 *
 * @summary the operation to simulate the eviction of spot virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_SimulateEviction.json
 */
async function simulateEvictionAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMS.simulateEviction(
    "ResourceGroup",
    "VmScaleSetName",
    "InstanceId",
  );
}

async function main(): Promise<void> {
  await simulateEvictionAVirtualMachine();
}

main().catch(console.error);
