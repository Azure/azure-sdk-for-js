// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a AiGatewayResource
 *
 * @summary delete a AiGatewayResource
 * x-ms-original-file: 2026-09-01-preview/AiGatewayDelete.json
 */
async function deleteAnAIGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayResources.delete("example-rg", "example-gateway", "*");
}

async function main(): Promise<void> {
  await deleteAnAIGateway();
}

main().catch(console.error);
