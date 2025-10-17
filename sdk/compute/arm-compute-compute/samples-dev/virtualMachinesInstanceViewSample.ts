// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about the run-time state of a virtual machine.
 *
 * @summary retrieves information about the run-time state of a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Get_InstanceView.json
 */
async function getVirtualMachineInstanceView(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.instanceView("myResourceGroup", "myVM");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about the run-time state of a virtual machine.
 *
 * @summary retrieves information about the run-time state of a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Get_InstanceViewAutoPlacedOnDedicatedHostGroup.json
 */
async function getInstanceViewOfAVirtualMachinePlacedOnADedicatedHostGroupThroughAutomaticPlacement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.instanceView("myResourceGroup", "myVM");
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualMachineInstanceView();
  await getInstanceViewOfAVirtualMachinePlacedOnADedicatedHostGroupThroughAutomaticPlacement();
}

main().catch(console.error);
