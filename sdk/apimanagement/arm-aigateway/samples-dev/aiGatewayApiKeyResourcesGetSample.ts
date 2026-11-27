// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AiGatewayApiKeyResource
 *
 * @summary get a AiGatewayApiKeyResource
 * x-ms-original-file: 2026-11-01/AiGatewayApiKeyGet.json
 */
async function getAnAIGatewayAPIKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayApiKeyResources.get(
    "example-rg",
    "example-gateway",
    "application-key",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnAIGatewayAPIKey();
}

main().catch(console.error);
