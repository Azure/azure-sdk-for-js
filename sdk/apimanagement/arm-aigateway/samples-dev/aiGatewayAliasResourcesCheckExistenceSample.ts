// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check for the existence of a AiGatewayAliasResource
 *
 * @summary check for the existence of a AiGatewayAliasResource
 * x-ms-original-file: 2026-11-01/AiGatewayAliasCheckExistence.json
 */
async function checkWhetherAnAIGatewayAliasExists(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayAliasResources.checkExistence(
    "example-rg",
    "example-gateway",
    "default",
    "chat",
  );
}

async function main(): Promise<void> {
  await checkWhetherAnAIGatewayAliasExists();
}

main().catch(console.error);
