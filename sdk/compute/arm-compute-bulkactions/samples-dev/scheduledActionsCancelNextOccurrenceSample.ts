// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancel the next scheduled occurrence of the scheduled action.
 *
 * @summary cancel the next scheduled occurrence of the scheduled action.
 * x-ms-original-file: 2026-07-06-preview/ScheduledActions_CancelNextOccurrence_MaximumSet_Gen.json
 */
async function scheduledActionsCancelNextOccurrenceMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.cancelNextOccurrence(
    "rgcompute",
    "myScheduledAction",
    {
      resourceIds: [
        "/subscriptions/1d04e8f1-ee04-4056-b0b2-718f5bb45b04/resourceGroups/myRg/providers/Microsoft.Compute/virtualMachines/myVm",
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsCancelNextOccurrenceMaximumSet();
}

main().catch(console.error);
