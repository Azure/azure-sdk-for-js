// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces a cost control.
 *
 * @summary creates or replaces a cost control.
 * x-ms-original-file: 2026-09-15-preview/CostControl/createOrUpdate.json
 */
async function createACostControlWithAllSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.costControls.createOrUpdate(
    "foundry-resource-group",
    "foundry-account",
    "production-agents",
    {
      properties: {
        displayName: "Production agent monthly budget",
        rules: [
          {
            name: "monthly-agent-budget",
            unit: "Usd",
            amount: 1000,
            period: "Month",
            recurring: true,
            match: {
              identityObjectIds: ["11111111-2222-3333-4444-555555555555"],
              sessionIds: ["production-session"],
              projectIds: [
                "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/foundry-resource-group/providers/Microsoft.CognitiveServices/accounts/foundry-account/projects/production",
              ],
              agentResourceIds: [
                "/subscriptions/00000000-1111-2222-3333-444444444444/accounts/foundry-account/project/production/agent/customer-support-agent",
                "/subscriptions/00000000-1111-2222-3333-444444444444/accounts/foundry-account/project/production/agent/sales-assistant-agent",
              ],
            },
            thresholds: [
              { type: "Percentage", value: 80, action: "Alert" },
              { type: "Absolute", value: 1000, action: "Block" },
            ],
            counterKey: { type: "Agent" },
          },
          {
            name: "daily-account-budget",
            unit: "Usd",
            amount: 100,
            period: "Day",
            recurring: true,
            thresholds: [{ type: "Percentage", value: 90, action: "Alert" }],
            counterKey: { type: "Account" },
          },
        ],
      },
    },
    { ifNoneMatch: "*" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createACostControlWithAllSettings();
}

main().catch(console.error);
