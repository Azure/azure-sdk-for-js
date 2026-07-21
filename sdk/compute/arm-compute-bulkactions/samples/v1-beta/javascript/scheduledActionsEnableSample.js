// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enable a previously disabled scheduled action so its future occurrences run.
 *
 * @summary enable a previously disabled scheduled action so its future occurrences run.
 * x-ms-original-file: 2026-07-06-preview/ScheduledActions_Enable_MaximumSet_Gen.json
 */
async function scheduledActionsEnableMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.enable("rgcompute", "myScheduledAction");
}

async function main() {
  await scheduledActionsEnableMaximumSet();
}

main().catch(console.error);
