// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enables the specified scheduled action so new occurrences run.
 *
 * @summary enables the specified scheduled action so new occurrences run.
 * x-ms-original-file: 2026-10-06-preview/ScheduledActions_Enable_BasicSuccess.json
 */
async function enableARecurringScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.enable("example-rg", "weekday-start");
}

async function main(): Promise<void> {
  await enableARecurringScheduledAction();
}

main().catch(console.error);
