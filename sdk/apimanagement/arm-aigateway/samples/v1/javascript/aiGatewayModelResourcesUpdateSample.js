// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a AiGatewayModelResource
 *
 * @summary update a AiGatewayModelResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelUpdate.json
 */
async function updateAnAIGatewayModel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayModelResources.update(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
    "gpt-4o",
    "*",
    {
      properties: {
        description: "Updated primary chat model",
        deployment: {
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.CognitiveServices/accounts/example-account/deployments/gpt-4o",
          modelName: "gpt-4o",
          modelVersion: "2024-11-20",
        },
        policies: [{ type: "tokenLimit", count: 100000, period: "day", counterKey: ["identity"] }],
        displayName: "GPT-4o",
        supportedEndpoints: ["chatCompletions", "responses"],
      },
    },
  );
  console.log(result);
}

async function main() {
  await updateAnAIGatewayModel();
}

main().catch(console.error);
