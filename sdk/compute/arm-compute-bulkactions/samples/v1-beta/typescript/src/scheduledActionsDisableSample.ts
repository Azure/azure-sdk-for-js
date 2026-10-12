// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables the specified scheduled action so future occurrences do not run.
 *
 * @summary disables the specified scheduled action so future occurrences do not run.
 * x-ms-original-file: 2026-10-06-preview/ScheduledActions_Disable_BasicSuccess.json
 */
async function disableARecurringScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.disable("example-rg", "weekday-start");
}

async function main(): Promise<void> {
  await disableARecurringScheduledAction();
}

main().catch(console.error);
