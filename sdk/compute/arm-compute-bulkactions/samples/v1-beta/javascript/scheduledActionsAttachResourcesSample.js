// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to adds resources to the specified recurring bulk action.
 *
 * @summary adds resources to the specified recurring bulk action.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_AttachResources_BasicSuccess.json
 */
async function _01AttachResourcesToARecurringBulkAction() {
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
 * This sample demonstrates how to adds resources to the specified recurring bulk action.
 *
 * @summary adds resources to the specified recurring bulk action.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_AttachResources_ComprehensiveSuccess.json
 */
async function _02AttachResourcesToARecurringBulkActionWithIndividualNotificationSettings() {
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
 * This sample demonstrates how to adds resources to the specified recurring bulk action.
 *
 * @summary adds resources to the specified recurring bulk action.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_AttachResources_PartialSuccess.json
 */
async function _03ResponseWithPartialResultsWhenAttachingResourcesToARecurringBulkAction() {
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
          "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await _01AttachResourcesToARecurringBulkAction();
  await _02AttachResourcesToARecurringBulkActionWithIndividualNotificationSettings();
  await _03ResponseWithPartialResultsWhenAttachingResourcesToARecurringBulkAction();
}

main().catch(console.error);
