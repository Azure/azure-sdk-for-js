// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this feature is currently in preview.
 *
 * Reimage one or more virtual machines. Reimaging is destructive and can replace operating system disk contents. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 *
 * @summary this feature is currently in preview.
 *
 * Reimage one or more virtual machines. Reimaging is destructive and can replace operating system disk contents. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 * x-ms-original-file: 2026-09-06-preview/VirtualMachineBulkOperations_BulkReimage_BasicSuccess.json
 */
async function _01ReimageMultipleVirtualMachines(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkReimageOperation(
    "example-rg",
    "eastus",
    {
      executionParameters: {},
      resources: {
        ids: [
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/bulk-vm-01",
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/bulk-vm-02",
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this feature is currently in preview.
 *
 * Reimage one or more virtual machines. Reimaging is destructive and can replace operating system disk contents. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 *
 * @summary this feature is currently in preview.
 *
 * Reimage one or more virtual machines. Reimaging is destructive and can replace operating system disk contents. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 * x-ms-original-file: 2026-09-06-preview/VirtualMachineBulkOperations_BulkReimage_ComprehensiveSuccess.json
 */
async function _02ReimageVirtualMachinesWithSharedSettingsAndAPerVMOverride(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkReimageOperation(
    "example-rg",
    "eastus",
    {
      executionParameters: { retryPolicy: { retryWindowInMinutes: 30 } },
      resources: {
        ids: [
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/bulk-vm-01",
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/bulk-vm-02",
        ],
      },
      reimageParameters: {
        baseProfile: {
          tempDisk: false,
          exactVersion: "1.0.0",
          osProfile: { customData: "I2Nsb3VkLWNvbmZpZwpwYWNrYWdlX3VwZ3JhZGU6IHRydWUK" },
        },
        resourceOverrides: [
          {
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/bulk-vm-02",
            profile: { tempDisk: false, exactVersion: "1.1.0" },
          },
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this feature is currently in preview.
 *
 * Reimage one or more virtual machines. Reimaging is destructive and can replace operating system disk contents. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 *
 * @summary this feature is currently in preview.
 *
 * Reimage one or more virtual machines. Reimaging is destructive and can replace operating system disk contents. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 * x-ms-original-file: 2026-09-06-preview/VirtualMachineBulkOperations_BulkReimage_VmNotFoundError.json
 */
async function _04ResponseWhenAVirtualMachineDoesNotExist(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkReimageOperation(
    "example-rg",
    "eastus",
    {
      executionParameters: {},
      resources: {
        ids: [
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/bulk-vm-01",
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/missing-vm",
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to this feature is currently in preview.
 *
 * Reimage one or more virtual machines. Reimaging is destructive and can replace operating system disk contents. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 *
 * @summary this feature is currently in preview.
 *
 * Reimage one or more virtual machines. Reimaging is destructive and can replace operating system disk contents. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 * x-ms-original-file: 2026-09-06-preview/VirtualMachineBulkOperations_BulkReimage_WithReimagePayload.json
 */
async function _03ReimageVirtualMachinesWithPerVMTemporaryDiskSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkReimageOperation(
    "example-rg",
    "eastus",
    {
      executionParameters: {},
      resources: {
        ids: [
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/ephemeral-vm-01",
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/ephemeral-vm-02",
        ],
      },
      reimageParameters: {
        baseProfile: { tempDisk: true },
        resourceOverrides: [
          {
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/ephemeral-vm-02",
            profile: { tempDisk: false },
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await _01ReimageMultipleVirtualMachines();
  await _02ReimageVirtualMachinesWithSharedSettingsAndAPerVMOverride();
  await _04ResponseWhenAVirtualMachineDoesNotExist();
  await _03ReimageVirtualMachinesWithPerVMTemporaryDiskSettings();
}

main().catch(console.error);
