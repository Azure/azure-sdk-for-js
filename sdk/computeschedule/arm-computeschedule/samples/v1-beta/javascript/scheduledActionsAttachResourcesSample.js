// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_AttachResources_MaximumSet_Gen.json
 */
async function scheduledActionsAttachResourcesMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.attachResources(
    "rgcomputeschedule",
    "myScheduledAction",
    {
      resources: [
        {
          resourceId:
            "/subscriptions/1d04e8f1-ee04-4056-b0b2-718f5bb45b04/resourceGroups/myRg/providers/Microsoft.Compute/virtualMachines/myVm",
          notificationSettings: [
            {
              destination: "wbhryycyolvnypjxzlawwvb",
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

async function main() {
  await scheduledActionsAttachResourcesMaximumSet();
}

main().catch(console.error);
