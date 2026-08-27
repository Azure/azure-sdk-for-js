// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists resources associated with the specified scheduled action.
 *
 * @summary lists resources associated with the specified scheduled action.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActions_ListResources_MaximumSet_Gen.json
 */
async function listResourcesAssociatedWithAScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listResources(
    "rgcompute",
    "myScheduledAction",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listResourcesAssociatedWithAScheduledAction();
}

main().catch(console.error);
