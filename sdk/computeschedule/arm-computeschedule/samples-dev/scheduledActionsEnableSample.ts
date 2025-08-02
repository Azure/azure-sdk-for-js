// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_Enable_MaximumSet_Gen.json
 */
async function scheduledActionsEnableMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  await client.scheduledActions.enable("rgcomputeschedule", "myScheduledAction");
}

async function main(): Promise<void> {
  await scheduledActionsEnableMaximumSet();
}

main().catch(console.error);
