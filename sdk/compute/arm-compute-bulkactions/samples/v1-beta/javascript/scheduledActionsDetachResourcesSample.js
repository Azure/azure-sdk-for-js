// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes resources from the specified scheduled action.
 *
 * @summary removes resources from the specified scheduled action.
 * x-ms-original-file: 2026-09-06-preview/ScheduledActions_DetachResources_BasicSuccess.json
 */
async function _01DetachResourcesFromARecurringScheduledAction() {
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
 * This sample demonstrates how to removes resources from the specified scheduled action.
 *
 * @summary removes resources from the specified scheduled action.
 * x-ms-original-file: 2026-09-06-preview/ScheduledActions_DetachResources_PartialSuccess.json
 */
async function _02DetachResourcesFromARecurringScheduledActionWithPartialSuccess() {
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

async function main() {
  await _01DetachResourcesFromARecurringScheduledAction();
  await _02DetachResourcesFromARecurringScheduledActionWithPartialSuccess();
}

main().catch(console.error);
