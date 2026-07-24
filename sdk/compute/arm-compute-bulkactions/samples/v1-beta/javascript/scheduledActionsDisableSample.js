// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disable the scheduled action so its future occurrences do not run.
 *
 * @summary disable the scheduled action so its future occurrences do not run.
 * x-ms-original-file: 2026-07-06-preview/ScheduledActions_Disable_MaximumSet_Gen.json
 */
async function scheduledActionsDisableMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.disable("rgcompute", "myScheduledAction");
}

async function main() {
  await scheduledActionsDisableMaximumSet();
}

main().catch(console.error);
