// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enables the specified scheduled action so new occurrences run.
 *
 * @summary enables the specified scheduled action so new occurrences run.
 * x-ms-original-file: 2026-09-06-preview/ScheduledActions_Enable_BasicSuccess.json
 */
async function enableARecurringScheduledAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.enable("example-rg", "weekday-start");
}

async function main() {
  await enableARecurringScheduledAction();
}

main().catch(console.error);
