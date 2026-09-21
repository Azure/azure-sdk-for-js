// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delays the specified occurrence for the specified resource IDs.
 *
 * @summary delays the specified occurrence for the specified resource IDs.
 * x-ms-original-file: 2026-09-06-preview/Occurrences_Delay_BasicSuccess.json
 */
async function _01DelayOperationsInARecurringScheduledActionOccurrence(): Promise<void> {
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
async function _02DelayAllOperationsInARecurringScheduledActionOccurrence(): Promise<void> {
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
async function _03ResponseWithPartialSuccessResultsWhenDelayingOperationsInARecurringScheduledActionOccurrence(): Promise<void> {
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

async function main(): Promise<void> {
  await _01DelayOperationsInARecurringScheduledActionOccurrence();
  await _02DelayAllOperationsInARecurringScheduledActionOccurrence();
  await _03ResponseWithPartialSuccessResultsWhenDelayingOperationsInARecurringScheduledActionOccurrence();
}

main().catch(console.error);
