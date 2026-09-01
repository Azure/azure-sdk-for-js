// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists scheduled actions in the specified subscription.
 *
 * @summary lists scheduled actions in the specified subscription.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActions_ListBySubscription_MaximumSet_Gen.json
 */
async function listScheduledActionsInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listScheduledActionsInASubscription();
}

main().catch(console.error);
