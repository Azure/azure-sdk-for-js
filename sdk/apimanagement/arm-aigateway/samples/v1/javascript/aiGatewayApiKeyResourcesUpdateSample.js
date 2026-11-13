// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a AiGatewayApiKeyResource
 *
 * @summary update a AiGatewayApiKeyResource
 * x-ms-original-file: 2026-11-01/AiGatewayApiKeyUpdate.json
 */
async function updateAnAIGatewayAPIKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayApiKeyResources.update(
    "example-rg",
    "example-gateway",
    "application-key",
    "*",
    { properties: { displayName: "Updated application key" } },
  );
  console.log(result);
}

async function main() {
  await updateAnAIGatewayAPIKey();
}

main().catch(console.error);
