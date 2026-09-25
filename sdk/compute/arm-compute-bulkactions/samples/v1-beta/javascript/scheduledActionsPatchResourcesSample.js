// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates resource-specific settings for the specified scheduled action.
 *
 * @summary updates resource-specific settings for the specified scheduled action.
 * x-ms-original-file: 2026-09-06-preview/ScheduledActions_PatchResources_BasicSuccess.json
 */
async function _01UpdateSettingsForRecurringScheduledActionResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.patchResources("example-rg", "weekday-start", {
    resources: [
      {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
        notificationSettings: [
          {
            destination: "operations@contoso.com",
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
            destination: "operations@contoso.com",
            type: "Email",
            language: "en-us",
            disabled: false,
          },
        ],
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates resource-specific settings for the specified scheduled action.
 *
 * @summary updates resource-specific settings for the specified scheduled action.
 * x-ms-original-file: 2026-09-06-preview/ScheduledActions_PatchResources_ComprehensiveSuccess.json
 */
async function _02UpdateResourceSpecificNotificationSettingsForARecurringScheduledAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.patchResources("example-rg", "weekday-start", {
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
 * This sample demonstrates how to updates resource-specific settings for the specified scheduled action.
 *
 * @summary updates resource-specific settings for the specified scheduled action.
 * x-ms-original-file: 2026-09-06-preview/ScheduledActions_PatchResources_PartialSuccess.json
 */
async function _03ResponseWithPartialResultsWhenUpdatingRecurringScheduledActionResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.patchResources("example-rg", "weekday-start", {
    resources: [
      {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-01",
        notificationSettings: [
          { destination: "admin@contoso.com", type: "Email", language: "en-us", disabled: true },
        ],
      },
      {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Compute/virtualMachines/web-vm-02",
        notificationSettings: [
          { destination: "admin@contoso.com", type: "Email", language: "en-us", disabled: true },
        ],
      },
    ],
  });
  console.log(result);
}

async function main() {
  await _01UpdateSettingsForRecurringScheduledActionResources();
  await _02UpdateResourceSpecificNotificationSettingsForARecurringScheduledAction();
  await _03ResponseWithPartialResultsWhenUpdatingRecurringScheduledActionResources();
}

main().catch(console.error);
