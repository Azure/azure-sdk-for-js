// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enables the specified scheduled action so new occurrences run.
 *
 * @summary enables the specified scheduled action so new occurrences run.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActions_Enable_MaximumSet_Gen.json
 */
async function enableAScheduledAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.enable("rgcompute", "myScheduledAction");
}

async function main() {
  await enableAScheduledAction();
}

main().catch(console.error);
