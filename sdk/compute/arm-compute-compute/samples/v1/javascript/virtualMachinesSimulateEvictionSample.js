// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to simulate the eviction of spot virtual machine.
 *
 * @summary the operation to simulate the eviction of spot virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_SimulateEviction.json
 */
async function simulateEvictionAVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachines.simulateEviction("ResourceGroup", "VMName");
}

async function main() {
  await simulateEvictionAVirtualMachine();
}

main().catch(console.error);
