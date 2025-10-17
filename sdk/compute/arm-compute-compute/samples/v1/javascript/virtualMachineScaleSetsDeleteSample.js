// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a VM scale set.
 *
 * @summary deletes a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Delete_Force.json
 */
async function forceDeleteAVMScaleSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.delete("myResourceGroup", "myvmScaleSet", {
    forceDeletion: true,
  });
}

async function main() {
  await forceDeleteAVMScaleSet();
}

main().catch(console.error);
