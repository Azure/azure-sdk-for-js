// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels the next occurrence of the specified scheduled action.
 *
 * @summary cancels the next occurrence of the specified scheduled action.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActions_CancelNextOccurrence_MaximumSet_Gen.json
 */
async function cancelTheNextScheduledActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.cancelNextOccurrence(
    "rgcompute",
    "myScheduledAction",
    {
      resourceIds: [
        "/subscriptions/CB26D7CB-3E27-465F-99C8-EAF7A4118245/resourceGroups/rgcompute/providers/Microsoft.Compute/virtualMachines/myVm",
        "/subscriptions/CB26D7CB-3E27-465F-99C8-EAF7A4118245/resourceGroups/rgcompute/providers/Microsoft.Compute/virtualMachines/myVm2",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await cancelTheNextScheduledActionOccurrence();
}

main().catch(console.error);
