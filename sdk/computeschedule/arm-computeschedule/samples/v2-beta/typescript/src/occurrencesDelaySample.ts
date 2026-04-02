// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2026-03-01-preview/Occurrences_Delay_MaximumSet_Gen.json
 */
async function occurrencesDelayMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.occurrences.delay(
    "rgcomputeschedule",
    "scheduled-action-01",
    "11111111-1111-1111-1111-111111111111",
    {
      delay: "2026-03-12T02:39:48.148Z",
      resourceIds: [
        "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgcomputeschedule/providers/Microsoft.Compute/virtualMachines/vm1",
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await occurrencesDelayMaximumSet();
}

main().catch(console.error);
