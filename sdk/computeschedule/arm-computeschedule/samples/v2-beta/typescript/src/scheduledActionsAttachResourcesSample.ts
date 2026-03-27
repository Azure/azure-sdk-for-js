// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_AttachResources_MaximumSet_Gen.json
 */
async function scheduledActionsAttachResourcesMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.attachResources(
    "rgcomputeschedule",
    "scheduled-action-01",
    {
      resources: [
        {
          resourceId:
            "/subscriptions/1d04e8f1-ee04-4056-b0b2-718f5bb45b04/resourceGroups/myRg/providers/Microsoft.Compute/virtualMachines/myVm",
          notificationSettings: [
            {
              destination: "zaaoabozbhyuhejwsrennfsxowp",
              type: "Email",
              language: "en-us",
              disabled: true,
            },
          ],
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsAttachResourcesMaximumSet();
}

main().catch(console.error);
