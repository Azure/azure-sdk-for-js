// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2026-03-01-preview/Occurrences_Cancel_MaximumSet_Gen.json
 */
async function occurrencesCancelMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.occurrences.cancel(
    "rgcomputeschedule",
    "scheduled-action-01",
    "11111111-1111-1111-1111-111111111111",
    {
      resourceIds: [
        "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgcomputeschedule/providers/Microsoft.Compute/virtualMachines/vm1",
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await occurrencesCancelMaximumSet();
}

main().catch(console.error);
