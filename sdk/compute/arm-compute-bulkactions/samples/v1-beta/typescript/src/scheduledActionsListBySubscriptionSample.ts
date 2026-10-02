// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists scheduled actions in the specified subscription.
 *
 * @summary lists scheduled actions in the specified subscription.
 * x-ms-original-file: 2026-10-06-preview/ScheduledActions_ListBySubscription_PagedSuccess.json
 */
async function listAPageOfRecurringScheduledActionsInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAPageOfRecurringScheduledActionsInASubscription();
}

main().catch(console.error);
