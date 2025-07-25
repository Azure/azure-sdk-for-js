// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ScheduledAction resources by resource group
 *
 * @summary list ScheduledAction resources by resource group
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_ListByResourceGroup_MaximumSet_Gen.json
 */
async function scheduledActionsListByResourceGroupMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listByResourceGroup("rgcomputeschedule")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list ScheduledAction resources by resource group
 *
 * @summary list ScheduledAction resources by resource group
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_ListByResourceGroup_MinimumSet_Gen.json
 */
async function scheduledActionsListByResourceGroupMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listByResourceGroup("rgcomputeschedule")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await scheduledActionsListByResourceGroupMaximumSet();
  await scheduledActionsListByResourceGroupMinimumSet();
}

main().catch(console.error);
