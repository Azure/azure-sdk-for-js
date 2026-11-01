// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists recurring bulk actions in the specified resource group.
 *
 * @summary lists recurring bulk actions in the specified resource group.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_ListByResourceGroup_PagedSuccess.json
 */
async function listRecurringBulkActionsInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listByResourceGroup("example-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRecurringBulkActionsInAResourceGroup();
}

main().catch(console.error);
