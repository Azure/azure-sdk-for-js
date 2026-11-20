// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AiGatewayModelResource resources by AiGatewayModelProviderResource
 *
 * @summary list AiGatewayModelResource resources by AiGatewayModelProviderResource
 * x-ms-original-file: 2026-11-01/AiGatewayModelList.json
 */
async function listModelsByProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiGatewayModelResources.listByModelProvider(
    "example-rg",
    "example-gateway",
    "default",
    "foundry-provider",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listModelsByProvider();
}

main().catch(console.error);
