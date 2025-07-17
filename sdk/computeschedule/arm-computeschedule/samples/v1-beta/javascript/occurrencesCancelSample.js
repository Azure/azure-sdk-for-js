// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2025-04-15-preview/Occurrences_Cancel_MaximumSet_Gen.json
 */
async function occurrencesCancelMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.occurrences.cancel(
    "rgcomputeschedule",
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
