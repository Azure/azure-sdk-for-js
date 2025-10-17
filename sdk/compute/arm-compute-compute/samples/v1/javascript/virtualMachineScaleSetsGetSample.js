// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to display information about a virtual machine scale set.
 *
 * @summary display information about a virtual machine scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Get.json
 */
async function getAVirtualMachineScaleSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
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
async function getAVirtualMachineScaleSetPlacedOnADedicatedHostGroupThroughAutomaticPlacement() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
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
async function getVMScaleSetVMWithDiskControllerType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
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
async function getAVirtualMachineScaleSetWithUserData() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.get(
    "myResourceGroup",
    "myVirtualMachineScaleSet",
    { expand: "userData" },
  );
  console.log(result);
}

async function main() {
  await getAVirtualMachineScaleSet();
  await getAVirtualMachineScaleSetPlacedOnADedicatedHostGroupThroughAutomaticPlacement();
  await getVMScaleSetVMWithDiskControllerType();
  await getAVirtualMachineScaleSetWithUserData();
}

main().catch(console.error);
