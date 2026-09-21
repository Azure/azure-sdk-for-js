// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delays the specified occurrence for the specified resource IDs.
 *
 * @summary delays the specified occurrence for the specified resource IDs.
 * x-ms-original-file: 2026-09-06-preview/Occurrences_Delay_BasicSuccess.json
 */
async function _01DelayOperationsInARecurringScheduledActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.occurrences.delay(
    "example-rg",
    "weekday-start",
    "77777777-7777-7777-7777-777777777777",
    {
      delay: "2026-09-15T09:00:00-07:00",
      resourceIds: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to delays the specified occurrence for the specified resource IDs.
 *
 * @summary delays the specified occurrence for the specified resource IDs.
 * x-ms-original-file: 2026-09-06-preview/Occurrences_Delay_EntireOccurrenceSuccess.json
 */
async function _02DelayAllOperationsInARecurringScheduledActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.occurrences.delay(
    "example-rg",
    "weekday-start",
    "77777777-7777-7777-7777-777777777777",
    { delay: "2026-09-15T09:00:00-07:00", resourceIds: [] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to delays the specified occurrence for the specified resource IDs.
 *
 * @summary delays the specified occurrence for the specified resource IDs.
 * x-ms-original-file: 2026-09-06-preview/Occurrences_Delay_PartialSuccess.json
 */
async function _03ResponseWithPartialSuccessResultsWhenDelayingOperationsInARecurringScheduledActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.occurrences.delay(
    "example-rg",
    "weekday-start",
    "77777777-7777-7777-7777-777777777777",
    {
      delay: "2026-09-15T09:00:00-07:00",
      resourceIds: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await _01DelayOperationsInARecurringScheduledActionOccurrence();
  await _02DelayAllOperationsInARecurringScheduledActionOccurrence();
  await _03ResponseWithPartialSuccessResultsWhenDelayingOperationsInARecurringScheduledActionOccurrence();
}

main().catch(console.error);
