// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ScheduledAction resources by resource group
 *
 * @summary list ScheduledAction resources by resource group
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_ListByResourceGroup_MaximumSet_Gen.json
 */
async function scheduledActionsListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listByResourceGroup("rgcomputeschedule")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await scheduledActionsListByResourceGroupMaximumSet();
}

main().catch(console.error);
