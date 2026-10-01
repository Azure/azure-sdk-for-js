// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2026-04-15-preview/ScheduledActions_TriggerManualOccurrence_MaximumSet_Gen.json
 */
async function scheduledActionsTriggerManualOccurrenceMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B4D97119-C802-4ADE-AF16-D9F92C9962C4";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.triggerManualOccurrence(
    "rgcomputeschedule",
    "my-scheduled-action",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsTriggerManualOccurrenceMaximumSet();
}

main().catch(console.error);
