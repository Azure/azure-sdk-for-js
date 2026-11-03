// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates selected properties of a cost control.
 *
 * @summary updates selected properties of a cost control.
 * x-ms-original-file: 2026-09-15-preview/CostControl/update.json
 */
async function updateAllConfigurableCostControlSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.costControls.update(
    "foundry-resource-group",
    "foundry-account",
    "production-agents",
    {
      properties: {
        displayName: "Updated production agent budget",
        rules: [
          {
            name: "monthly-agent-budget",
            unit: "Usd",
            amount: 1500,
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
              { type: "Absolute", value: 1500, action: "Block" },
            ],
            counterKey: { type: "Agent" },
          },
        ],
      },
    },
    { ifMatch: '"00000000-0000-0000-0000-000000000001"' },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates selected properties of a cost control.
 *
 * @summary updates selected properties of a cost control.
 * x-ms-original-file: 2026-09-15-preview/CostControl/updateMetadata.json
 */
async function updateMetadataWhilePreservingLegacyRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.costControls.update(
    "foundry-resource-group",
    "foundry-account",
    "legacy-budget",
    { properties: { displayName: "Renamed legacy budget" } },
    { ifMatch: '"00000000-0000-0000-0000-000000000001"' },
  );
  console.log(result);
}

async function main() {
  await updateAllConfigurableCostControlSettings();
  await updateMetadataWhilePreservingLegacyRules();
}

main().catch(console.error);
