// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a AiGatewayAliasResource
 *
 * @summary delete a AiGatewayAliasResource
 * x-ms-original-file: 2026-11-01/AiGatewayAliasDelete.json
 */
async function deleteAnAIGatewayAlias() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayAliasResources.delete(
    "example-rg",
    "example-gateway",
    "default",
    "chat",
    "*",
  );
}

async function main() {
  await deleteAnAIGatewayAlias();
}

main().catch(console.error);
