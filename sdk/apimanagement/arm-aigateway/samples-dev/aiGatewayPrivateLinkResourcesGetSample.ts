// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AiGatewayResource PrivateLink
 *
 * @summary get a AiGatewayResource PrivateLink
 * x-ms-original-file: 2026-11-01/AiGatewayPrivateLinkResourceGet.json
 */
async function getAPrivateLinkResourceForAnAIGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayPrivateLinkResources.get(
    "example-rg",
    "example-gateway",
    "Gateway",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAPrivateLinkResourceForAnAIGateway();
}

main().catch(console.error);
