// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes resources from the specified scheduled action.
 *
 * @summary removes resources from the specified scheduled action.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActions_DetachResources_MaximumSet_Gen.json
 */
async function removeResourcesFromAScheduledAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.detachResources("rgcompute", "myScheduledAction", {
    resources: [
      "/subscriptions/CB26D7CB-3E27-465F-99C8-EAF7A4118245/resourceGroups/rgcompute/providers/Microsoft.Compute/virtualMachines/myVm",
      "/subscriptions/CB26D7CB-3E27-465F-99C8-EAF7A4118245/resourceGroups/rgcompute/providers/Microsoft.Compute/virtualMachines/myVm2",
    ],
  });
  console.log(result);
}

async function main() {
  await removeResourcesFromAScheduledAction();
}

main().catch(console.error);
