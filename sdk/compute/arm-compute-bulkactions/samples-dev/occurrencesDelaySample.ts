// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delays the specified occurrence for the specified resource IDs.
 *
 * @summary delays the specified occurrence for the specified resource IDs.
 * x-ms-original-file: 2026-08-06-preview/Occurrences_Delay_MaximumSet_Gen.json
 */
async function delayResourcesInAScheduledActionOccurrence(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.occurrences.delay(
    "rgcompute",
    "myScheduledAction",
    "67b5bada-4772-43fc-8dbb-402476d98a45",
    {
      delay: "2026-08-05T17:00:00.000-07:00",
      resourceIds: [
        "/subscriptions/CB26D7CB-3E27-465F-99C8-EAF7A4118245/resourceGroups/rgcompute/providers/Microsoft.Compute/virtualMachines/myVm",
        "/subscriptions/CB26D7CB-3E27-465F-99C8-EAF7A4118245/resourceGroups/rgcompute/providers/Microsoft.Compute/virtualMachines/myVm2",
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await delayResourcesInAScheduledActionOccurrence();
}

main().catch(console.error);
