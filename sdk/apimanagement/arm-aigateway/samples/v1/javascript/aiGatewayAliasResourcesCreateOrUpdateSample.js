// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a AiGatewayAliasResource
 *
 * @summary create a AiGatewayAliasResource
 * x-ms-original-file: 2026-11-01/AiGatewayAliasCreate.json
 */
async function createOrUpdateAnAIGatewayAlias() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayAliasResources.createOrUpdate(
    "example-rg",
    "example-gateway",
    "default",
    "chat",
    {
      properties: {
        aliasName: "chat",
        description: "Stable chat model alias",
        backendModels: [
          {
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.ApiManagement/aigateways/example-gateway/workspaces/default/modelProviders/foundry-provider/models/gpt-4o",
            priority: 0,
            weight: 1,
          },
        ],
        selectionOrder: ["priority"],
        policies: [
          {
            type: "costLimit",
            scope: "resource",
            id: "daily-budget",
            amount: 10,
            period: "day",
            counterKey: ["identity"],
          },
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a AiGatewayAliasResource
 *
 * @summary create a AiGatewayAliasResource
 * x-ms-original-file: 2026-11-01/AiGatewayAliasCreateAutoModelSelection.json
 */
async function createAnAIGatewayAliasWithAutomaticModelSelectionAndFailover() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayAliasResources.createOrUpdate(
    "example-rg",
    "example-gateway",
    "default",
    "chat-router",
    {
      properties: {
        aliasName: "chat-router",
        description: "Chat alias with automatic model selection and failover",
        backendModels: [
          {
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.ApiManagement/aigateways/example-gateway/workspaces/default/modelProviders/foundry-provider/models/gpt-4o",
            selectorModelName: "gpt-4o",
            priority: 0,
            weight: 1,
          },
          {
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.ApiManagement/aigateways/example-gateway/workspaces/default/modelProviders/foundry-provider/models/gpt-4o-mini",
            selectorModelName: "gpt-4o-mini",
            priority: 0,
            weight: 1,
          },
        ],
        selectionOrder: ["autoModelSelection", "priority"],
        autoModelSelection: {
          objective: "Balanced",
          allowedRequestOverrides: ["model", "objective", "filterModelsForToolCompatibility"],
        },
        failures: [
          {
            when: "@cel(response != null && response.status_code in [429, 500, 503])",
            retryAttempts: 1,
            excludeFor: "PT30S",
          },
        ],
        maxRetryAttempts: 2,
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAnAIGatewayAlias();
  await createAnAIGatewayAliasWithAutomaticModelSelectionAndFailover();
}

main().catch(console.error);
