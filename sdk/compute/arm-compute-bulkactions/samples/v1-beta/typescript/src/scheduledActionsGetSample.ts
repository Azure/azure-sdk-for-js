// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified recurring bulk action.
 *
 * @summary gets the specified recurring bulk action.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_Get_BasicSuccess.json
 */
async function _01GetARecurringBulkAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.get("example-rg", "weekday-start");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified recurring bulk action.
 *
 * @summary gets the specified recurring bulk action.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_Get_ComprehensiveSuccess.json
 */
async function _02GetARecurringBulkActionWithCompleteConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.get("example-rg", "weekday-start");
  console.log(result);
}

async function main(): Promise<void> {
  await _01GetARecurringBulkAction();
  await _02GetARecurringBulkActionWithCompleteConfiguration();
}

main().catch(console.error);
