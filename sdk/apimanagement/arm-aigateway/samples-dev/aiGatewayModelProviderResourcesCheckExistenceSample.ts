// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check for the existence of a AiGatewayModelProviderResource
 *
 * @summary check for the existence of a AiGatewayModelProviderResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelProviderCheckExistence.json
 */
async function checkWhetherAnAIGatewayModelProviderExists(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayModelProviderResources.checkExistence(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
  );
}

async function main(): Promise<void> {
  await checkWhetherAnAIGatewayModelProviderExists();
}

main().catch(console.error);
