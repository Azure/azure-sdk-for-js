// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AiGatewayModelProviderResource
 *
 * @summary get a AiGatewayModelProviderResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelProviderGet.json
 */
async function getAModelProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayModelProviderResources.get(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAModelProvider();
}

main().catch(console.error);
