// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Occurrence resources by ScheduledAction
 *
 * @summary list Occurrence resources by ScheduledAction
 * x-ms-original-file: 2026-03-01-preview/Occurrences_ListByScheduledAction_MaximumSet_Gen.json
 */
async function occurrencesListByScheduledActionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.occurrences.listByScheduledAction(
    "rgcomputeschedule",
    "scheduled-action-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await occurrencesListByScheduledActionMaximumSet();
}

main().catch(console.error);
