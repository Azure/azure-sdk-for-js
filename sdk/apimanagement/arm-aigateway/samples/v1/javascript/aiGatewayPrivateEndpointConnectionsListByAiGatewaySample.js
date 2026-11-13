// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AiGatewayResource PrivateEndpointConnections
 *
 * @summary list AiGatewayResource PrivateEndpointConnections
 * x-ms-original-file: 2026-11-01/AiGatewayPrivateEndpointConnectionList.json
 */
async function listPrivateEndpointConnectionsForAnAIGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiGatewayPrivateEndpointConnections.listByAiGateway(
    "example-rg",
    "example-gateway",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateEndpointConnectionsForAnAIGateway();
}

main().catch(console.error);
