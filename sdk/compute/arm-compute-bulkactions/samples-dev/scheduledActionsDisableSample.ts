// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables the specified scheduled action so future occurrences do not run.
 *
 * @summary disables the specified scheduled action so future occurrences do not run.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActions_Disable_MaximumSet_Gen.json
 */
async function disableAScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.disable("rgcompute", "myScheduledAction");
}

async function main(): Promise<void> {
  await disableAScheduledAction();
}

main().catch(console.error);
