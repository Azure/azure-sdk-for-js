// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a AiGatewayModelProviderResource
 *
 * @summary update a AiGatewayModelProviderResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelProviderUpdate.json
 */
async function updateAModelProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayModelProviderResources.update(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
    "*",
    {
      properties: {
        displayName: "Updated Foundry provider",
        foundry: {
          endpoint: { url: "https://example-foundry.services.ai.azure.com" },
          resourceIds: [
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.CognitiveServices/accounts/example-account",
          ],
        },
        authentication: { managedIdentity: { resource: "https://cognitiveservices.azure.com" } },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAModelProvider();
}

main().catch(console.error);
