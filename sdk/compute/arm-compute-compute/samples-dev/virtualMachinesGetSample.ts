// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about the model view or the instance view of a virtual machine.
 *
 * @summary retrieves information about the model view or the instance view of a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Get.json
 */
async function getAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.get("myResourceGroup", "myVM", {
    expand: "userData",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about the model view or the instance view of a virtual machine.
 *
 * @summary retrieves information about the model view or the instance view of a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Get_AutoPlacedOnDedicatedHostGroup.json
 */
async function getAVirtualMachinePlacedOnADedicatedHostGroupThroughAutomaticPlacement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.get("myResourceGroup", "myVM");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about the model view or the instance view of a virtual machine.
 *
 * @summary retrieves information about the model view or the instance view of a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Get_WithDiskControllerType.json
 */
async function getAVirtualMachineWithDiskControllerTypeProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.get("myResourceGroup", "myVM", {
    expand: "userData",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about the model view or the instance view of a virtual machine.
 *
 * @summary retrieves information about the model view or the instance view of a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Get_WithVMSizeProperties.json
 */
async function getAVirtualMachineWithVMSizeProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.get("myResourceGroup", "myVM");
  console.log(result);
}

async function main(): Promise<void> {
  await getAVirtualMachine();
  await getAVirtualMachinePlacedOnADedicatedHostGroupThroughAutomaticPlacement();
  await getAVirtualMachineWithDiskControllerTypeProperties();
  await getAVirtualMachineWithVMSizeProperties();
}

main().catch(console.error);
