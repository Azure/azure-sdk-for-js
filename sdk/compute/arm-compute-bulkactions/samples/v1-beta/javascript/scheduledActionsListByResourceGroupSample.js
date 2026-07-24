// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ScheduledAction resources by resource group
 *
 * @summary list ScheduledAction resources by resource group
 * x-ms-original-file: 2026-07-06-preview/ScheduledActions_ListByResourceGroup_MaximumSet_Gen.json
 */
async function scheduledActionsListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listByResourceGroup("rgcompute")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await scheduledActionsListByResourceGroupMaximumSet();
}

main().catch(console.error);
