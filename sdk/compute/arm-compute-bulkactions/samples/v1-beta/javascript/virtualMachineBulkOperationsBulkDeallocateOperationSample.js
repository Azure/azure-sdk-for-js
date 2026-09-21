// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deallocate one or more virtual machines. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 *
 * @summary deallocate one or more virtual machines. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 * x-ms-original-file: 2026-09-06-preview/VirtualMachineBulkOperations_BulkDeallocate_BasicSuccess.json
 */
async function _01DeallocateMultipleVirtualMachines() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkDeallocateOperation(
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
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to deallocate one or more virtual machines. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 *
 * @summary deallocate one or more virtual machines. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
 * x-ms-original-file: 2026-09-06-preview/VirtualMachineBulkOperations_BulkDeallocate_VmNotFoundError.json
 */
async function _02ResponseWhenAVirtualMachineDoesNotExist() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkDeallocateOperation(
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

async function main() {
  await _01DeallocateMultipleVirtualMachines();
  await _02ResponseWhenAVirtualMachineDoesNotExist();
}

main().catch(console.error);
