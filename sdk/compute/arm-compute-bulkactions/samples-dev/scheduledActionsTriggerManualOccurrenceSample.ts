// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to runs the specified scheduled action immediately.
 *
 * @summary runs the specified scheduled action immediately.
 * x-ms-original-file: 2026-10-06-preview/ScheduledActions_TriggerManualOccurrence_BasicSuccess.json
 */
async function runARecurringScheduledActionImmediately(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.triggerManualOccurrence(
    "example-rg",
    "weekday-start",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await runARecurringScheduledActionImmediately();
}

main().catch(console.error);
