// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state.
 *
 * @summary reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Reimage_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetReimageMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.reimage("rgcompute", "aaaaaaaaaaaaaaaaaaaaaaaaaa", {
    vmScaleSetReimageInput: {
      instanceIds: ["aaaaaaaaaa"],
      forceUpdateOSDiskForEphemeral: true,
      tempDisk: true,
    },
  });
}

/**
 * This sample demonstrates how to reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state.
 *
 * @summary reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Reimage_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetReimageMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.reimage("rgcompute", "aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
}

async function main() {
  await virtualMachineScaleSetReimageMaximumSetGen();
  await virtualMachineScaleSetReimageMinimumSetGen();
}

main().catch(console.error);
