// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes resources from the specified recurring bulk action.
 *
 * @summary removes resources from the specified recurring bulk action.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_DetachResources_BasicSuccess.json
 */
async function _01DetachResourcesFromARecurringBulkAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.detachResources("example-rg", "weekday-start", {
    resources: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to removes resources from the specified recurring bulk action.
 *
 * @summary removes resources from the specified recurring bulk action.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_DetachResources_PartialSuccess.json
 */
async function _02DetachResourcesFromARecurringBulkActionWithPartialSuccess() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.detachResources("example-rg", "weekday-start", {
    resources: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
    ],
  });
  console.log(result);
}

async function main() {
  await _01DetachResourcesFromARecurringBulkAction();
  await _02DetachResourcesFromARecurringBulkActionWithPartialSuccess();
}

main().catch(console.error);
