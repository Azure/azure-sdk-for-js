// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ScheduledAction resources by subscription ID
 *
 * @summary list ScheduledAction resources by subscription ID
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_ListBySubscription_MaximumSet_Gen.json
 */
async function scheduledActionsListBySubscriptionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list ScheduledAction resources by subscription ID
 *
 * @summary list ScheduledAction resources by subscription ID
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_ListBySubscription_MinimumSet_Gen.json
 */
async function scheduledActionsListBySubscriptionMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await scheduledActionsListBySubscriptionMaximumSet();
  await scheduledActionsListBySubscriptionMinimumSet();
}

main().catch(console.error);
