// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a AiGatewayModelProviderResource
 *
 * @summary create a AiGatewayModelProviderResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelProviderCreate.json
 */
async function createAFoundryModelProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayModelProviderResources.createOrUpdate(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
    {
      properties: {
        modelProviderType: "Foundry",
        displayName: "Foundry provider",
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

/**
 * This sample demonstrates how to create a AiGatewayModelProviderResource
 *
 * @summary create a AiGatewayModelProviderResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelProviderCreateCustom.json
 */
async function createACustomModelProviderWithAPIKeyAuthentication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayModelProviderResources.createOrUpdate(
    "example-rg",
    "example-gateway",
    "default",
    "custom-provider",
    {
      properties: {
        modelProviderType: "Custom",
        displayName: "Custom provider",
        custom: { endpoint: { url: "https://api.contoso.com/v1" } },
        authentication: { headers: [{ name: "api-key", value: "{api-key}" }] },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createAFoundryModelProvider();
  await createACustomModelProviderWithAPIKeyAuthentication();
}

main().catch(console.error);
