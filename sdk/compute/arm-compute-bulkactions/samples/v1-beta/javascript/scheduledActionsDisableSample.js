// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disables the specified recurring bulk action so future occurrences do not run.
 *
 * @summary disables the specified recurring bulk action so future occurrences do not run.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_Disable_BasicSuccess.json
 */
async function disableARecurringBulkAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.disable("example-rg", "weekday-start");
}

async function main() {
  await disableARecurringBulkAction();
}

main().catch(console.error);
