// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a AiGatewayResource
 *
 * @summary delete a AiGatewayResource
 * x-ms-original-file: 2026-09-01-preview/AiGatewayDelete.json
 */
async function deleteAnAIGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayResources.delete("example-rg", "example-gateway", "*");
}

async function main() {
  await deleteAnAIGateway();
}

main().catch(console.error);
