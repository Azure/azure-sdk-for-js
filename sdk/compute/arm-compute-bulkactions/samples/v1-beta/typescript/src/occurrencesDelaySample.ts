// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delay the occurrence to a later time.
 *
 * @summary delay the occurrence to a later time.
 * x-ms-original-file: 2026-07-06-preview/Occurrences_Delay_MaximumSet_Gen.json
 */
async function occurrencesDelayMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.occurrences.delay(
    "rgcompute",
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
