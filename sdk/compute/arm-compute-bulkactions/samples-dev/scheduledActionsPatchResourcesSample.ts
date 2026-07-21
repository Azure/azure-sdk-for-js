// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2026-07-06-preview/ScheduledActions_PatchResources_MaximumSet_Gen.json
 */
async function scheduledActionsPatchResourcesMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.patchResources("rgcompute", "myScheduledAction", {
    resources: [
      {
        resourceId:
          "/subscriptions/1d04e8f1-ee04-4056-b0b2-718f5bb45b04/resourceGroups/myRg/providers/Microsoft.Compute/virtualMachines/myVm",
        notificationSettings: [
          { destination: "admin@contoso.com", type: "Email", language: "en-us", disabled: true },
        ],
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsPatchResourcesMaximumSet();
}

main().catch(console.error);
