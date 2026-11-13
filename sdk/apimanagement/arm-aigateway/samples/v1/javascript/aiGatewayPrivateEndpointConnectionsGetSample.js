// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AiGatewayResource PrivateEndpointConnection
 *
 * @summary get a AiGatewayResource PrivateEndpointConnection
 * x-ms-original-file: 2026-11-01/AiGatewayPrivateEndpointConnectionGet.json
 */
async function getAPrivateEndpointConnectionForAnAIGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayPrivateEndpointConnections.get(
    "example-rg",
    "example-gateway",
    "33333333-3333-3333-3333-333333333333",
  );
  console.log(result);
}

async function main() {
  await getAPrivateEndpointConnectionForAnAIGateway();
}

main().catch(console.error);
