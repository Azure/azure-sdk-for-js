// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ScheduledAction
 *
 * @summary delete a ScheduledAction
 * x-ms-original-file: 2026-07-06-preview/ScheduledActions_Delete_MaximumSet_Gen.json
 */
async function scheduledActionsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.delete("rgcompute", "myScheduledAction");
}

async function main() {
  await scheduledActionsDeleteMaximumSet();
}

main().catch(console.error);
