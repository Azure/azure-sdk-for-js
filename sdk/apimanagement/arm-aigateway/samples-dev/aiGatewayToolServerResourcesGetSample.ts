// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AiGatewayToolServerResource
 *
 * @summary get a AiGatewayToolServerResource
 * x-ms-original-file: 2026-11-01/AiGatewayToolServerGet.json
 */
async function getAToolServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayToolServerResources.get(
    "example-rg",
    "example-gateway",
    "default",
    "weather-tools",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a AiGatewayToolServerResource
 *
 * @summary get a AiGatewayToolServerResource
 * x-ms-original-file: 2026-11-01/AiGatewayToolServerGetWithOAuth.json
 */
async function getAToolServerWithOAuthConnectionStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayToolServerResources.get(
    "example-rg",
    "example-gateway",
    "default",
    "weather-tools",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAToolServer();
  await getAToolServerWithOAuthConnectionStatus();
}

main().catch(console.error);
