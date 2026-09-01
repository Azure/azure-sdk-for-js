// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified scheduled action.
 *
 * @summary deletes the specified scheduled action.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActions_Delete_MaximumSet_Gen.json
 */
async function deleteAScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.delete("rgcompute", "myScheduledAction");
}

async function main(): Promise<void> {
  await deleteAScheduledAction();
}

main().catch(console.error);
