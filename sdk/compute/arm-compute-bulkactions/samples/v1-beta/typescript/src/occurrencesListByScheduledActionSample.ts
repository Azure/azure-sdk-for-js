// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists occurrences for the specified scheduled action.
 *
 * @summary lists occurrences for the specified scheduled action.
 * x-ms-original-file: 2026-10-06-preview/Occurrences_ListByScheduledAction_BasicSuccess.json
 */
async function _01ListRecurringScheduledActionOccurrences(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.occurrences.listByScheduledAction(
    "example-rg",
    "weekday-start",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists occurrences for the specified scheduled action.
 *
 * @summary lists occurrences for the specified scheduled action.
 * x-ms-original-file: 2026-10-06-preview/Occurrences_ListByScheduledAction_PagedSuccess.json
 */
async function _02ListAPageOfRecurringScheduledActionOccurrences(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.occurrences.listByScheduledAction(
    "example-rg",
    "weekday-start",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await _01ListRecurringScheduledActionOccurrences();
  await _02ListAPageOfRecurringScheduledActionOccurrences();
}

main().catch(console.error);
