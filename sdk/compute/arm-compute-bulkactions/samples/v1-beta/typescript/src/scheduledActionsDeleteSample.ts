// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified recurring bulk action.
 *
 * @summary deletes the specified recurring bulk action.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_Delete_BasicSuccess.json
 */
async function deleteARecurringBulkAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.delete("example-rg", "weekday-start");
}

async function main(): Promise<void> {
  await deleteARecurringBulkAction();
}

main().catch(console.error);
