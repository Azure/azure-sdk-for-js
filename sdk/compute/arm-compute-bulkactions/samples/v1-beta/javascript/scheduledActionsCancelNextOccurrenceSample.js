// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels the next occurrence of the specified scheduled action.
 *
 * @summary cancels the next occurrence of the specified scheduled action.
 * x-ms-original-file: 2026-10-06-preview/ScheduledActions_CancelNextOccurrence_BasicSuccess.json
 */
async function _01CancelTheNextRecurringScheduledActionOccurrenceForMultipleResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.cancelNextOccurrence("example-rg", "weekday-start", {
    resourceIds: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to cancels the next occurrence of the specified scheduled action.
 *
 * @summary cancels the next occurrence of the specified scheduled action.
 * x-ms-original-file: 2026-10-06-preview/ScheduledActions_CancelNextOccurrence_EntireOccurrenceSuccess.json
 */
async function _02CancelAllOperationsInTheNextRecurringScheduledActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.cancelNextOccurrence("example-rg", "weekday-start", {
    resourceIds: [],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to cancels the next occurrence of the specified scheduled action.
 *
 * @summary cancels the next occurrence of the specified scheduled action.
 * x-ms-original-file: 2026-10-06-preview/ScheduledActions_CancelNextOccurrence_PartialSuccess.json
 */
async function _03ResponseWithPartialResultsWhenCancelingTheNextRecurringScheduledActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.cancelNextOccurrence("example-rg", "weekday-start", {
    resourceIds: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
    ],
  });
  console.log(result);
}

async function main() {
  await _01CancelTheNextRecurringScheduledActionOccurrenceForMultipleResources();
  await _02CancelAllOperationsInTheNextRecurringScheduledActionOccurrence();
  await _03ResponseWithPartialResultsWhenCancelingTheNextRecurringScheduledActionOccurrence();
}

main().catch(console.error);
