// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AiGatewayResource PrivateEndpointConnection
 *
 * @summary get a AiGatewayResource PrivateEndpointConnection
 * x-ms-original-file: 2026-11-01/AiGatewayPrivateEndpointConnectionGet.json
 */
async function getAPrivateEndpointConnectionForAnAIGateway(): Promise<void> {
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

async function main(): Promise<void> {
  await getAPrivateEndpointConnectionForAnAIGateway();
}

main().catch(console.error);
