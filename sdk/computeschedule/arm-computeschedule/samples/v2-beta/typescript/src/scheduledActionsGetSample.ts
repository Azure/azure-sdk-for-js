// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ScheduledAction
 *
 * @summary get a ScheduledAction
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_Get_MaximumSet_Gen.json
 */
async function scheduledActionsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.get("rgcomputeschedule", "scheduled-action-01");
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsGetMaximumSet();
}

main().catch(console.error);
