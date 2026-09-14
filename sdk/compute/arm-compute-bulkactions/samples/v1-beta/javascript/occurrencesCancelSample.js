// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels the specified occurrence for the specified resource IDs.
 *
 * @summary cancels the specified occurrence for the specified resource IDs.
 * x-ms-original-file: 2026-08-06-preview/Occurrences_Cancel_MaximumSet_Gen.json
 */
async function cancelResourcesInAScheduledActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.occurrences.cancel(
    "rgcompute",
    "myScheduledAction",
    "67b5bada-4772-43fc-8dbb-402476d98a45",
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
  await cancelResourcesInAScheduledActionOccurrence();
}

main().catch(console.error);
