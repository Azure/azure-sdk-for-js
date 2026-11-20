// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a AiGatewayApiKeyResource
 *
 * @summary delete a AiGatewayApiKeyResource
 * x-ms-original-file: 2026-11-01/AiGatewayApiKeyDelete.json
 */
async function deleteAnAIGatewayAPIKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayApiKeyResources.delete(
    "example-rg",
    "example-gateway",
    "application-key",
    "*",
  );
}

async function main() {
  await deleteAnAIGatewayAPIKey();
}

main().catch(console.error);
