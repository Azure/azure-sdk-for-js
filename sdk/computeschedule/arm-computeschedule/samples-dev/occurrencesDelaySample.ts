// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2025-04-15-preview/Occurrences_Delay_MaximumSet_Gen.json
 */
async function occurrencesDelayMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.occurrences.delay(
    "rgcomputeschedule",
    "myScheduledAction",
    "CB26D7CB-3E27-465F-99C8-EAF7A4118245",
    {
      delay: "2025-05-22T17:00:00.000-07:00",
      resourceIds: [
        "/subscriptions/CB26D7CB-3E27-465F-99C8-EAF7A4118245/resourceGroups/myRg/providers/Microsoft.Compute/virtualMachines/myVm",
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await occurrencesDelayMaximumSet();
}

main().catch(console.error);
