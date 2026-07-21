// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to trigger a manual occurrence of the scheduled action immediately, outside its normal schedule.
 *
 * @summary trigger a manual occurrence of the scheduled action immediately, outside its normal schedule.
 * x-ms-original-file: 2026-07-06-preview/ScheduledActions_TriggerManualOccurrence_MaximumSet_Gen.json
 */
async function scheduledActionsTriggerManualOccurrenceMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.triggerManualOccurrence(
    "rgcompute",
    "myScheduledAction",
  );
  console.log(result);
}

async function main() {
  await scheduledActionsTriggerManualOccurrenceMaximumSet();
}

main().catch(console.error);
