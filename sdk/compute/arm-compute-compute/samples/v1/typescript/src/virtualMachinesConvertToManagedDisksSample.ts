// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation.
 *
 * @summary converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_ConvertToManagedDisks_MaximumSet_Gen.json
 */
async function virtualMachineConvertToManagedDisksMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.convertToManagedDisks("rgcompute", "aaaaaaa");
  console.log(result);
}

/**
 * This sample demonstrates how to converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation.
 *
 * @summary converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_ConvertToManagedDisks_MinimumSet_Gen.json
 */
async function virtualMachineConvertToManagedDisksMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.convertToManagedDisks("rgcompute", "aaaaaaaaaaa");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineConvertToManagedDisksMaximumSetGen();
  await virtualMachineConvertToManagedDisksMinimumSetGen();
}

main().catch(console.error);
