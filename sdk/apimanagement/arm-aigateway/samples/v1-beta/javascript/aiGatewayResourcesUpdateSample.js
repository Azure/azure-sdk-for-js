// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a AiGatewayResource
 *
 * @summary update a AiGatewayResource
 * x-ms-original-file: 2026-09-01-preview/AiGatewayUpdate.json
 */
async function updateAIGatewayTagsAndSKU() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayResources.update("example-rg", "example-gateway", "*", {
    tags: { environment: "production" },
    sku: { name: "AIGateway" },
  });
  console.log(result);
}

async function main() {
  await updateAIGatewayTagsAndSKU();
}

main().catch(console.error);
