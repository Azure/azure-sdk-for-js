// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates the primary API key value.
 *
 * @summary regenerates the primary API key value.
 * x-ms-original-file: 2026-11-01/AiGatewayApiKeyRegeneratePrimaryKey.json
 */
async function regenerateThePrimaryAIGatewayAPIKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayApiKeyResources.regeneratePrimaryKey(
    "example-rg",
    "example-gateway",
    "application-key",
  );
}

async function main(): Promise<void> {
  await regenerateThePrimaryAIGatewayAPIKey();
}

main().catch(console.error);
