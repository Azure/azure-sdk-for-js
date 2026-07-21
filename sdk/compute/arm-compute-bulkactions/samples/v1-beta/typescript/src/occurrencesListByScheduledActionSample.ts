// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Occurrence resources by ScheduledAction
 *
 * @summary list Occurrence resources by ScheduledAction
 * x-ms-original-file: 2026-07-06-preview/Occurrences_ListByScheduledAction_MaximumSet_Gen.json
 */
async function occurrencesListByScheduledActionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.occurrences.listByScheduledAction(
    "rgcompute",
    "myScheduledAction",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await occurrencesListByScheduledActionMaximumSet();
}

main().catch(console.error);
