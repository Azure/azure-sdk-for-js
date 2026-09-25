// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to runs the specified scheduled action immediately.
 *
 * @summary runs the specified scheduled action immediately.
 * x-ms-original-file: 2026-09-06-preview/ScheduledActions_TriggerManualOccurrence_BasicSuccess.json
 */
async function runARecurringScheduledActionImmediately() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.triggerManualOccurrence(
    "example-rg",
    "weekday-start",
  );
  console.log(result);
}

async function main() {
  await runARecurringScheduledActionImmediately();
}

main().catch(console.error);
