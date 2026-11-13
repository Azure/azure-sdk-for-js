// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AiGatewayAliasResource
 *
 * @summary get a AiGatewayAliasResource
 * x-ms-original-file: 2026-11-01/AiGatewayAliasGet.json
 */
async function getAnAIGatewayAlias(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayAliasResources.get(
    "example-rg",
    "example-gateway",
    "default",
    "chat",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnAIGatewayAlias();
}

main().catch(console.error);
