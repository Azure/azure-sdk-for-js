// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check for the existence of a AiGatewayApiKeyResource
 *
 * @summary check for the existence of a AiGatewayApiKeyResource
 * x-ms-original-file: 2026-11-01/AiGatewayApiKeyCheckExistence.json
 */
async function checkWhetherAnAIGatewayApiKeyExists(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayApiKeyResources.checkExistence(
    "example-rg",
    "example-gateway",
    "application-key",
  );
}

async function main(): Promise<void> {
  await checkWhetherAnAIGatewayApiKeyExists();
}

main().catch(console.error);
