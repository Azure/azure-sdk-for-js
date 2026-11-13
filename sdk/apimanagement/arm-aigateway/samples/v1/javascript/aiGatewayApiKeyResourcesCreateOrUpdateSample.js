// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a AiGatewayApiKeyResource
 *
 * @summary create a AiGatewayApiKeyResource
 * x-ms-original-file: 2026-11-01/AiGatewayApiKeyCreate.json
 */
async function createAnAIGatewayAPIKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayApiKeyResources.createOrUpdate(
    "example-rg",
    "example-gateway",
    "application-key",
    { properties: { displayName: "Application key" } },
  );
  console.log(result);
}

async function main() {
  await createAnAIGatewayAPIKey();
}

main().catch(console.error);
