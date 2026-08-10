// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enable a previously disabled scheduled action so its future occurrences run.
 *
 * @summary enable a previously disabled scheduled action so its future occurrences run.
 * x-ms-original-file: 2026-07-06-preview/ScheduledActions_Enable_MaximumSet_Gen.json
 */
async function scheduledActionsEnableMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.enable("rgcompute", "myScheduledAction");
}

async function main(): Promise<void> {
  await scheduledActionsEnableMaximumSet();
}

main().catch(console.error);
