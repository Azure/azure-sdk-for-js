// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerates the secondary API key value.
 *
 * @summary regenerates the secondary API key value.
 * x-ms-original-file: 2026-11-01/AiGatewayApiKeyRegenerateSecondaryKey.json
 */
async function regenerateTheSecondaryAIGatewayAPIKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayApiKeyResources.regenerateSecondaryKey(
    "example-rg",
    "example-gateway",
    "application-key",
  );
}

async function main() {
  await regenerateTheSecondaryAIGatewayAPIKey();
}

main().catch(console.error);
