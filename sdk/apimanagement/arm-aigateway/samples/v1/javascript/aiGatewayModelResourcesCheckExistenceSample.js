// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check for the existence of a AiGatewayModelResource
 *
 * @summary check for the existence of a AiGatewayModelResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelCheckExistence.json
 */
async function checkWhetherAnAIGatewayModelExists() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayModelResources.checkExistence(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
    "gpt-4o",
  );
}

async function main() {
  await checkWhetherAnAIGatewayModelExists();
}

main().catch(console.error);
