// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation.
 *
 * @summary converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_ConvertToManagedDisks_MaximumSet_Gen.json
 */
async function virtualMachineConvertToManagedDisksMaximumSetGen() {
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
async function virtualMachineConvertToManagedDisksMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.convertToManagedDisks("rgcompute", "aaaaaaaaaaa");
  console.log(result);
}

async function main() {
  await virtualMachineConvertToManagedDisksMaximumSetGen();
  await virtualMachineConvertToManagedDisksMinimumSetGen();
}

main().catch(console.error);
