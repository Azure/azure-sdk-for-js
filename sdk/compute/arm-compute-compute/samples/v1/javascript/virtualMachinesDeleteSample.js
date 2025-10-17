// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a virtual machine.
 *
 * @summary the operation to delete a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Delete_Force.json
 */
async function forceDeleteAVM() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachines.delete("myResourceGroup", "myVM", {
    forceDeletion: true,
  });
}

async function main() {
  await forceDeleteAVM();
}

main().catch(console.error);
