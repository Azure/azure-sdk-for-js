// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation.
 *
 * @summary converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation.
 * x-ms-original-file: 2025-11-01/virtualMachineExamples/VirtualMachine_ConvertToManagedDisks_MaximumSet_Gen.json
 */
async function virtualMachineConvertToManagedDisksMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.convertToManagedDisks("rgcompute", "aaaaaaa");
}

/**
 * This sample demonstrates how to converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation.
 *
 * @summary converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation.
 * x-ms-original-file: 2025-11-01/virtualMachineExamples/VirtualMachine_ConvertToManagedDisks_MinimumSet_Gen.json
 */
async function virtualMachineConvertToManagedDisksMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.convertToManagedDisks("rgcompute", "aaaaaaaaaaa");
}

async function main() {
  await virtualMachineConvertToManagedDisksMaximumSetGen();
  await virtualMachineConvertToManagedDisksMinimumSetGen();
}

main().catch(console.error);
