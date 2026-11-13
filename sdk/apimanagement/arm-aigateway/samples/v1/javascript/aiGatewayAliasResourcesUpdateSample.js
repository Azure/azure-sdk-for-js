// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a AiGatewayAliasResource
 *
 * @summary update a AiGatewayAliasResource
 * x-ms-original-file: 2026-11-01/AiGatewayAliasUpdate.json
 */
async function updateAnAIGatewayAlias() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayAliasResources.update(
    "example-rg",
    "example-gateway",
    "default",
    "chat",
    "*",
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

async function main() {
  await updateAnAIGatewayAlias();
}

main().catch(console.error);
