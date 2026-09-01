// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disables the specified scheduled action so future occurrences do not run.
 *
 * @summary disables the specified scheduled action so future occurrences do not run.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActions_Disable_MaximumSet_Gen.json
 */
async function disableAScheduledAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.disable("rgcompute", "myScheduledAction");
}

async function main() {
  await disableAScheduledAction();
}

main().catch(console.error);
