// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds resources to the specified scheduled action.
 *
 * @summary adds resources to the specified scheduled action.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActions_AttachResources_MaximumSet_Gen.json
 */
async function addResourcesToAScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.attachResources("rgcompute", "myScheduledAction", {
    resources: [
      {
        resourceId:
          "/subscriptions/CB26D7CB-3E27-465F-99C8-EAF7A4118245/resourceGroups/rgcompute/providers/Microsoft.Compute/virtualMachines/myVm",
        notificationSettings: [
          { destination: "admin@contoso.com", type: "Email", language: "en-us", disabled: true },
        ],
      },
      {
        resourceId:
          "/subscriptions/CB26D7CB-3E27-465F-99C8-EAF7A4118245/resourceGroups/rgcompute/providers/Microsoft.Compute/virtualMachines/myVm2",
        notificationSettings: [
          { destination: "admin@contoso.com", type: "Email", language: "en-us", disabled: true },
        ],
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await addResourcesToAScheduledAction();
}

main().catch(console.error);
