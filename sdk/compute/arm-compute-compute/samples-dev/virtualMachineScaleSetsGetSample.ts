// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to display information about a virtual machine scale set.
 *
 * @summary display information about a virtual machine scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Get.json
 */
async function getAVirtualMachineScaleSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.get(
    "myResourceGroup",
    "myVirtualMachineScaleSet",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to display information about a virtual machine scale set.
 *
 * @summary display information about a virtual machine scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Get_AutoPlacedOnDedicatedHostGroup.json
 */
async function getAVirtualMachineScaleSetPlacedOnADedicatedHostGroupThroughAutomaticPlacement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.get(
    "myResourceGroup",
    "myVirtualMachineScaleSet",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to display information about a virtual machine scale set.
 *
 * @summary display information about a virtual machine scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Get_WithDiskControllerType.json
 */
async function getVMScaleSetVMWithDiskControllerType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.get(
    "myResourceGroup",
    "myVirtualMachineScaleSet",
    { expand: "userData" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to display information about a virtual machine scale set.
 *
 * @summary display information about a virtual machine scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Get_WithUserData.json
 */
async function getAVirtualMachineScaleSetWithUserData(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.get(
    "myResourceGroup",
    "myVirtualMachineScaleSet",
    { expand: "userData" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAVirtualMachineScaleSet();
  await getAVirtualMachineScaleSetPlacedOnADedicatedHostGroupThroughAutomaticPlacement();
  await getVMScaleSetVMWithDiskControllerType();
  await getAVirtualMachineScaleSetWithUserData();
}

main().catch(console.error);
