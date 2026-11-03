// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeBulkActionsClient } = require("@azure/arm-computebulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesExecuteDelete_MaximumSet_Gen.json
 */
async function bulkActionsVirtualMachinesExecuteDeleteMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const result = await client.bulkActions.virtualMachinesExecuteDelete("east2us2euap", {
    executionParameters: { retryPolicy: { retryCount: 2, retryWindowInMinutes: 45 } },
    resources: {
      ids: [
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource3",
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource4",
      ],
    },
    correlationid: "dfe927c5-16a6-40b7-a0f7-8524975ed642",
    forceDeletion: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesExecuteDelete_MinimumSet_Gen.json
 */
async function bulkActionsVirtualMachinesExecuteDeleteMinimumSetGenGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const result = await client.bulkActions.virtualMachinesExecuteDelete("eastus2euap", {
    executionParameters: {},
    resources: {
      ids: [
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource3",
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource4",
      ],
    },
    correlationid: "4431320c-7a90-4300-b82b-73f0696ae50e",
  });
  console.log(result);
}

async function main() {
  await bulkActionsVirtualMachinesExecuteDeleteMaximumSetGenGeneratedByMaximumSetRule();
  await bulkActionsVirtualMachinesExecuteDeleteMinimumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
