// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AiGatewayResource
 *
 * @summary get a AiGatewayResource
 * x-ms-original-file: 2026-09-01-preview/AiGatewayGet.json
 */
async function getAnAIGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayResources.get("example-rg", "example-gateway");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnAIGateway();
}

main().catch(console.error);
