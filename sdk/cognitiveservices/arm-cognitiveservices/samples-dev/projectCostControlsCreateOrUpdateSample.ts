// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces a project-owned cost control.
 * The definition may contain at most one notification, including disabled notifications, and one Block action.
 * Exceeding either limit returns HTTP 400 without persisting the request.
 *
 * @summary creates or replaces a project-owned cost control.
 * The definition may contain at most one notification, including disabled notifications, and one Block action.
 * Exceeding either limit returns HTTP 400 without persisting the request.
 * x-ms-original-file: 2026-11-15-preview/ProjectCostControl/createOrUpdate.json
 */
async function createOrReplaceAProjectTokenBudget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.projectCostControls.createOrUpdate(
    "foundry-resource-group",
    "foundry-account",
    "production",
    "project-token-budget",
    {
      properties: {
        category: "Tokens",
        amount: 1000000,
        timeGrain: "Daily",
        timePeriod: {
          startDate: new Date("2026-11-15T00:00:00Z"),
          endDate: new Date("2027-11-15T00:00:00Z"),
        },
        filter: {
          additionalInfo: { name: "tokenType", operator: "In", values: ["input", "output"] },
        },
        notifications: {
          usageAlert: {
            eventGridConnectionId:
              "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/foundry-resource-group/providers/Microsoft.CognitiveServices/accounts/foundry-account/connections/budget-alerts",
            thresholdType: "Percentage",
            threshold: 80,
            enabled: true,
            operator: "GreaterThanOrEqualTo",
          },
        },
        providerProperties: {
          actions: {
            stopRequests: {
              type: "Block",
              thresholdType: "Percentage",
              threshold: 100,
              operator: "GreaterThanOrEqualTo",
            },
          },
        },
      },
    },
    { ifNoneMatch: "*" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplaceAProjectTokenBudget();
}

main().catch(console.error);
