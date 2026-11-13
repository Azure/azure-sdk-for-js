// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check for the existence of a AiGatewayToolServerResource
 *
 * @summary check for the existence of a AiGatewayToolServerResource
 * x-ms-original-file: 2026-11-01/AiGatewayToolServerCheckExistence.json
 */
async function checkWhetherAnAIGatewayToolServerExists() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayToolServerResources.checkExistence(
    "example-rg",
    "example-gateway",
    "default",
    "weather-tools",
  );
}

async function main() {
  await checkWhetherAnAIGatewayToolServerExists();
}

main().catch(console.error);
