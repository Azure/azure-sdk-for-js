// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a virtual machine from a VM scale set.
 *
 * @summary deletes a virtual machine from a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Delete_Force.json
 */
async function forceDeleteAVirtualMachineFromAVMScaleSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMS.delete("myResourceGroup", "myvmScaleSet", "0", {
    forceDeletion: true,
  });
}

async function main() {
  await forceDeleteAVirtualMachineFromAVMScaleSet();
}

main().catch(console.error);
