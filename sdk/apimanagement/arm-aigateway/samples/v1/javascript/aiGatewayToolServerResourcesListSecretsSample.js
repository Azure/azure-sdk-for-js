// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists secret values configured on tool server endpoints.
 *
 * @summary lists secret values configured on tool server endpoints.
 * x-ms-original-file: 2026-11-01/AiGatewayToolServerListSecrets.json
 */
async function listToolServerSecrets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayToolServerResources.listSecrets(
    "example-rg",
    "example-gateway",
    "default",
    "weather-tools",
  );
  console.log(result);
}

async function main() {
  await listToolServerSecrets();
}

main().catch(console.error);
