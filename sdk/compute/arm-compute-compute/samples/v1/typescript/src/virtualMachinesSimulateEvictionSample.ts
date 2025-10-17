// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to simulate the eviction of spot virtual machine.
 *
 * @summary the operation to simulate the eviction of spot virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_SimulateEviction.json
 */
async function simulateEvictionAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.simulateEviction("ResourceGroup", "VMName");
}

async function main(): Promise<void> {
  await simulateEvictionAVirtualMachine();
}

main().catch(console.error);
