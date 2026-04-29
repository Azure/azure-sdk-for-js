// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses.
 *
 * @summary shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses.
 * x-ms-original-file: 2025-11-01/virtualMachineExamples/VirtualMachine_Deallocate_MinimumSet_Gen.json
 */
async function virtualMachineDeallocateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.deallocate("rgcompute", "aaaaaaaaaaaaaaaa");
}

/**
 * This sample demonstrates how to shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses.
 *
 * @summary shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses.
 * x-ms-original-file: 2025-11-01/virtualMachineExamples/VirtualMachine_Deallocate_WithForceDeallocate.json
 */
async function virtualMachineDeallocateWithForceDeallocate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.deallocate("rgcompute", "aaaaaaaaaaaaaaaa", {
    forceDeallocate: true,
  });
}

/**
 * This sample demonstrates how to shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses.
 *
 * @summary shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses.
 * x-ms-original-file: 2025-11-01/virtualMachineExamples/VirtualMachine_Deallocate_WithHibernation.json
 */
async function virtualMachineDeallocateWithHibernation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.deallocate("rgcompute", "aaaaaaaaaaaaaaaa", { hibernate: true });
}

async function main(): Promise<void> {
  await virtualMachineDeallocateMinimumSetGen();
  await virtualMachineDeallocateWithForceDeallocate();
  await virtualMachineDeallocateWithHibernation();
}

main().catch(console.error);
