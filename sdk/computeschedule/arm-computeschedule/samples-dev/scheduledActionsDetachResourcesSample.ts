// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_DetachResources_MaximumSet_Gen.json
 */
async function scheduledActionsDetachResourcesMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.detachResources(
    "rgcomputeschedule",
    "myScheduledAction",
    {
      resources: [
        "/subscriptions/1d04e8f1-ee04-4056-b0b2-718f5bb45b04/resourceGroups/myRg/providers/Microsoft.Compute/virtualMachines/myVm",
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsDetachResourcesMaximumSet();
}

main().catch(console.error);
