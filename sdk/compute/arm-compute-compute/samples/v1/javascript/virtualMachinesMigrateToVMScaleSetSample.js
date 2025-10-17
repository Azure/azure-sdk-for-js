// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to migrate a virtual machine from availability set to Flexible Virtual Machine Scale Set.
 *
 * @summary migrate a virtual machine from availability set to Flexible Virtual Machine Scale Set.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_MigrateToVirtualMachineScaleSet.json
 */
async function migrateAVirtualMachineToFlexibleVirtualMachineScaleSer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachines.migrateToVMScaleSet("myResourceGroup", "myVMName", {
    parameters: { targetFaultDomain: 0, targetVMSize: "Standard_D1_v2" },
  });
}

async function main() {
  await migrateAVirtualMachineToFlexibleVirtualMachineScaleSer();
}

main().catch(console.error);
