// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enables the specified recurring bulk action so new occurrences run.
 *
 * @summary enables the specified recurring bulk action so new occurrences run.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_Enable_BasicSuccess.json
 */
async function enableARecurringBulkAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.enable("example-rg", "weekday-start");
}

async function main(): Promise<void> {
  await enableARecurringBulkAction();
}

main().catch(console.error);
