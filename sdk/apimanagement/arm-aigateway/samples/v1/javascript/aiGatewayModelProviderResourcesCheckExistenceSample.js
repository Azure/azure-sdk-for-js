// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check for the existence of a AiGatewayModelProviderResource
 *
 * @summary check for the existence of a AiGatewayModelProviderResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelProviderCheckExistence.json
 */
async function checkWhetherAnAIGatewayModelProviderExists() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayModelProviderResources.checkExistence(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
  );
}

async function main() {
  await checkWhetherAnAIGatewayModelProviderExists();
}

main().catch(console.error);
