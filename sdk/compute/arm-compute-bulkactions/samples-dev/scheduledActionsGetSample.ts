// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified scheduled action.
 *
 * @summary gets the specified scheduled action.
 * x-ms-original-file: 2026-10-06-preview/ScheduledActions_Get_BasicSuccess.json
 */
async function _01GetARecurringScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.get("example-rg", "weekday-start");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified scheduled action.
 *
 * @summary gets the specified scheduled action.
 * x-ms-original-file: 2026-10-06-preview/ScheduledActions_Get_ComprehensiveSuccess.json
 */
async function _02GetARecurringScheduledActionWithCompleteConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.get("example-rg", "weekday-start");
  console.log(result);
}

async function main(): Promise<void> {
  await _01GetARecurringScheduledAction();
  await _02GetARecurringScheduledActionWithCompleteConfiguration();
}

main().catch(console.error);
