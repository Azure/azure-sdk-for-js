// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ScheduledAction resources by subscription ID
 *
 * @summary list ScheduledAction resources by subscription ID
 * x-ms-original-file: 2026-04-15-preview/ScheduledActions_ListBySubscription_MaximumSet_Gen.json
 */
async function scheduledActionsListBySubscriptionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
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
 * x-ms-original-file: 2026-04-15-preview/ScheduledActions_ListBySubscription_MinimumSet_Gen.json
 */
async function scheduledActionsListBySubscriptionMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await scheduledActionsListBySubscriptionMaximumSet();
  await scheduledActionsListBySubscriptionMinimumSet();
}

main().catch(console.error);
