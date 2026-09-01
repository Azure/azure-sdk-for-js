// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enables the specified scheduled action so new occurrences run.
 *
 * @summary enables the specified scheduled action so new occurrences run.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActions_Enable_MaximumSet_Gen.json
 */
async function enableAScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.enable("rgcompute", "myScheduledAction");
}

async function main(): Promise<void> {
  await enableAScheduledAction();
}

main().catch(console.error);
