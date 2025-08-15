// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Occurrence resources by ScheduledAction
 *
 * @summary list Occurrence resources by ScheduledAction
 * x-ms-original-file: 2025-04-15-preview/Occurrences_ListByScheduledAction_MaximumSet_Gen.json
 */
async function occurrencesListByScheduledActionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.occurrences.listByScheduledAction(
    "rgcomputeschedule",
    "myScheduledAction",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await occurrencesListByScheduledActionMaximumSet();
}

main().catch(console.error);
