// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to simulate the eviction of spot virtual machine in a VM scale set.
 *
 * @summary the operation to simulate the eviction of spot virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_SimulateEviction.json
 */
async function simulateEvictionAVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMS.simulateEviction(
    "ResourceGroup",
    "VmScaleSetName",
    "InstanceId",
  );
}

async function main() {
  await simulateEvictionAVirtualMachine();
}

main().catch(console.error);
