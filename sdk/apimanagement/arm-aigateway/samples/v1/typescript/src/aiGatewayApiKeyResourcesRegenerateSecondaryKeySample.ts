// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates the secondary API key value.
 *
 * @summary regenerates the secondary API key value.
 * x-ms-original-file: 2026-11-01/AiGatewayApiKeyRegenerateSecondaryKey.json
 */
async function regenerateTheSecondaryAIGatewayAPIKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayApiKeyResources.regenerateSecondaryKey(
    "example-rg",
    "example-gateway",
    "application-key",
  );
}

async function main(): Promise<void> {
  await regenerateTheSecondaryAIGatewayAPIKey();
}

main().catch(console.error);
