// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeBulkActionsClient } from "@azure/arm-computebulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesExecuteDeallocate_MaximumSet_Gen.json
 */
async function bulkActionsVirtualMachinesExecuteDeallocateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D8E30CC0-2763-4FCC-84A8-3C5659281032";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const result = await client.bulkActions.virtualMachinesExecuteDeallocate("eastus2euap", {
    executionParameters: { retryPolicy: { retryCount: 4, retryWindowInMinutes: 27 } },
    resources: {
      ids: [
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource3",
      ],
    },
    correlationid: "4431320c-7a90-4300-b82b-73f0696ae50e",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesExecuteDeallocate_MinimumSet_Gen.json
 */
async function bulkActionsVirtualMachinesExecuteDeallocateMinimumSetGenGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const result = await client.bulkActions.virtualMachinesExecuteDeallocate("eastus2euap", {
    executionParameters: {},
    resources: {
      ids: [
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource3",
      ],
    },
    correlationid: "4431320c-7a90-4300-b82b-73f0696ae50e",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await bulkActionsVirtualMachinesExecuteDeallocateMaximumSetGenGeneratedByMaximumSetRule();
  await bulkActionsVirtualMachinesExecuteDeallocateMinimumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
