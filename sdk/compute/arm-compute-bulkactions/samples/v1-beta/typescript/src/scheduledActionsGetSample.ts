// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified scheduled action.
 *
 * @summary gets the specified scheduled action.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActions_Get_MaximumSet_Gen.json
 */
async function getAScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.get("rgcompute", "myScheduledAction");
  console.log(result);
}

async function main(): Promise<void> {
  await getAScheduledAction();
}

main().catch(console.error);
