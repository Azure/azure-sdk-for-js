// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds resources to the specified scheduled action.
 *
 * @summary adds resources to the specified scheduled action.
 * x-ms-original-file: 2026-10-06-preview/ScheduledActions_AttachResources_BasicSuccess.json
 */
async function _01AttachResourcesToARecurringScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.attachResources("example-rg", "weekday-start", {
    resources: [
      {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
      },
      {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to adds resources to the specified scheduled action.
 *
 * @summary adds resources to the specified scheduled action.
 * x-ms-original-file: 2026-10-06-preview/ScheduledActions_AttachResources_ComprehensiveSuccess.json
 */
async function _02AttachResourcesToARecurringScheduledActionWithIndividualNotificationSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.attachResources("example-rg", "weekday-start", {
    resources: [
      {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
        notificationSettings: [
          {
            destination: "web-operations@contoso.com",
            type: "Email",
            language: "en-us",
            disabled: false,
          },
        ],
      },
      {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
        notificationSettings: [
          {
            destination: "service-owners@contoso.com",
            type: "Email",
            language: "en-us",
            disabled: false,
          },
          { destination: "audit@contoso.com", type: "Email", language: "en-us", disabled: true },
        ],
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to adds resources to the specified scheduled action.
 *
 * @summary adds resources to the specified scheduled action.
 * x-ms-original-file: 2026-10-06-preview/ScheduledActions_AttachResources_PartialSuccess.json
 */
async function _03ResponseWithPartialResultsWhenAttachingResourcesToARecurringScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.attachResources("example-rg", "weekday-start", {
    resources: [
      {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
      },
      {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await _01AttachResourcesToARecurringScheduledAction();
  await _02AttachResourcesToARecurringScheduledActionWithIndividualNotificationSettings();
  await _03ResponseWithPartialResultsWhenAttachingResourcesToARecurringScheduledAction();
}

main().catch(console.error);
