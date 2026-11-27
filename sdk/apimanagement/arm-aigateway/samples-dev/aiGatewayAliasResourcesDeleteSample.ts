// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a AiGatewayAliasResource
 *
 * @summary delete a AiGatewayAliasResource
 * x-ms-original-file: 2026-11-01/AiGatewayAliasDelete.json
 */
async function deleteAnAIGatewayAlias(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayAliasResources.delete(
    "example-rg",
    "example-gateway",
    "default",
    "chat",
    "*",
  );
}

async function main(): Promise<void> {
  await deleteAnAIGatewayAlias();
}

main().catch(console.error);
