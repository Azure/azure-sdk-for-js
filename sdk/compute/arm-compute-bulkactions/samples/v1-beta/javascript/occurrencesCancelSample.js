// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel the occurrence so its pending operations do not run.
 *
 * @summary cancel the occurrence so its pending operations do not run.
 * x-ms-original-file: 2026-07-06-preview/Occurrences_Cancel_MaximumSet_Gen.json
 */
async function occurrencesCancelMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.occurrences.cancel(
    "rgcompute",
    "myScheduledAction",
    "CB26D7CB-3E27-465F-99C8-EAF7A4118245",
    {
      resourceIds: [
        "/subscriptions/CB26D7CB-3E27-465F-99C8-EAF7A4118245/resourceGroups/myRg/providers/Microsoft.Compute/virtualMachines/myVm",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await occurrencesCancelMaximumSet();
}

main().catch(console.error);
