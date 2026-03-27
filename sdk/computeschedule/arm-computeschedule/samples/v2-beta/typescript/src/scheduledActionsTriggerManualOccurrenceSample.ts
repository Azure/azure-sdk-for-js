// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_TriggerManualOccurrence_MaximumSet_Gen.json
 */
async function scheduledActionsTriggerManualOccurrenceMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.triggerManualOccurrence(
    "rgcomputeschedule",
    "scheduled-action-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsTriggerManualOccurrenceMaximumSet();
}

main().catch(console.error);
