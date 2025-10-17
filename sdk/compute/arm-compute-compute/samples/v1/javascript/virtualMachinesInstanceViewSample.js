// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about the run-time state of a virtual machine.
 *
 * @summary retrieves information about the run-time state of a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Get_InstanceView.json
 */
async function getVirtualMachineInstanceView() {
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
async function getInstanceViewOfAVirtualMachinePlacedOnADedicatedHostGroupThroughAutomaticPlacement() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.instanceView("myResourceGroup", "myVM");
  console.log(result);
}

async function main() {
  await getVirtualMachineInstanceView();
  await getInstanceViewOfAVirtualMachinePlacedOnADedicatedHostGroupThroughAutomaticPlacement();
}

main().catch(console.error);
