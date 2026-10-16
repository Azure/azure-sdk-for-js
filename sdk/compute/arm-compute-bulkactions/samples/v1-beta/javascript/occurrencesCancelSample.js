// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels the specified occurrence for the specified resource IDs.
 *
 * @summary cancels the specified occurrence for the specified resource IDs.
 * x-ms-original-file: 2026-10-06-preview/Occurrences_Cancel_BasicSuccess.json
 */
async function _01CancelOperationsInARecurringBulkActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.occurrences.cancel(
    "example-rg",
    "weekday-start",
    "77777777-7777-7777-7777-777777777777",
    {
      resourceIds: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to cancels the specified occurrence for the specified resource IDs.
 *
 * @summary cancels the specified occurrence for the specified resource IDs.
 * x-ms-original-file: 2026-10-06-preview/Occurrences_Cancel_EntireOccurrenceSuccess.json
 */
async function _02CancelAllOperationsInARecurringBulkActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.occurrences.cancel(
    "example-rg",
    "weekday-start",
    "77777777-7777-7777-7777-777777777777",
    { resourceIds: [] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to cancels the specified occurrence for the specified resource IDs.
 *
 * @summary cancels the specified occurrence for the specified resource IDs.
 * x-ms-original-file: 2026-10-06-preview/Occurrences_Cancel_PartialSuccess.json
 */
async function _03ResponseWithPartialResultsWhenCancelingResourcesInARecurringBulkActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.occurrences.cancel(
    "example-rg",
    "weekday-start",
    "77777777-7777-7777-7777-777777777777",
    {
      resourceIds: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await _01CancelOperationsInARecurringBulkActionOccurrence();
  await _02CancelAllOperationsInARecurringBulkActionOccurrence();
  await _03ResponseWithPartialResultsWhenCancelingResourcesInARecurringBulkActionOccurrence();
}

main().catch(console.error);
