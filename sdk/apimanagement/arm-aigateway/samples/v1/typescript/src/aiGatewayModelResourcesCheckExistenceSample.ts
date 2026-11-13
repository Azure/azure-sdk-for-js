// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check for the existence of a AiGatewayModelResource
 *
 * @summary check for the existence of a AiGatewayModelResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelCheckExistence.json
 */
async function checkWhetherAnAIGatewayModelExists(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayModelResources.checkExistence(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
    "gpt-4o",
  );
}

async function main(): Promise<void> {
  await checkWhetherAnAIGatewayModelExists();
}

main().catch(console.error);
