// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ScheduledAction resources by subscription ID
 *
 * @summary list ScheduledAction resources by subscription ID
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_ListBySubscription_MaximumSet_Gen.json
 */
async function scheduledActionsListBySubscriptionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await scheduledActionsListBySubscriptionMaximumSet();
}

main().catch(console.error);
