// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a AiGatewayModelResource
 *
 * @summary create a AiGatewayModelResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelCreate.json
 */
async function createAnAIGatewayModel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayModelResources.createOrUpdate(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
    "gpt-4o",
    {
      properties: {
        displayName: "GPT-4o",
        description: "Primary chat model",
        deployment: {
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.CognitiveServices/accounts/example-account/deployments/gpt-4o",
          modelName: "gpt-4o",
          modelVersion: "2024-11-20",
        },
        policies: [{ type: "tokenLimit", count: 100000, period: "day", counterKey: ["identity"] }],
        supportedEndpoints: ["chatCompletions", "responses"],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAnAIGatewayModel();
}

main().catch(console.error);
