// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists resources associated with the specified recurring bulk action.
 *
 * @summary lists resources associated with the specified recurring bulk action.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_ListResources_PagedSuccess.json
 */
async function listAPageOfResourcesAssociatedWithARecurringBulkAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listResources("example-rg", "weekday-start")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAPageOfResourcesAssociatedWithARecurringBulkAction();
}

main().catch(console.error);
