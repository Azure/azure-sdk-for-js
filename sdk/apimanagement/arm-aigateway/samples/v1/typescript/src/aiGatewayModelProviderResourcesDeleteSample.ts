// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a AiGatewayModelProviderResource
 *
 * @summary delete a AiGatewayModelProviderResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelProviderDelete.json
 */
async function deleteAModelProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayModelProviderResources.delete(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
    "*",
  );
}

async function main(): Promise<void> {
  await deleteAModelProvider();
}

main().catch(console.error);
