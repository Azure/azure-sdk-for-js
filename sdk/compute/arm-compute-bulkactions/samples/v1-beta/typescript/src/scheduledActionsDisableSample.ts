// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disable the scheduled action so its future occurrences do not run.
 *
 * @summary disable the scheduled action so its future occurrences do not run.
 * x-ms-original-file: 2026-07-06-preview/ScheduledActions_Disable_MaximumSet_Gen.json
 */
async function scheduledActionsDisableMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.disable("rgcompute", "myScheduledAction");
}

async function main(): Promise<void> {
  await scheduledActionsDisableMaximumSet();
}

main().catch(console.error);
