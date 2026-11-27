// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a AiGatewayToolServerResource
 *
 * @summary delete a AiGatewayToolServerResource
 * x-ms-original-file: 2026-11-01/AiGatewayToolServerDelete.json
 */
async function deleteAToolServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayToolServerResources.delete(
    "example-rg",
    "example-gateway",
    "default",
    "weather-tools",
    "*",
  );
}

async function main(): Promise<void> {
  await deleteAToolServer();
}

main().catch(console.error);
