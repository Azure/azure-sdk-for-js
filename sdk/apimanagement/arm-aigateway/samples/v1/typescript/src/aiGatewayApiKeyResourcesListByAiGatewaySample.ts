// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AiGatewayApiKeyResource resources by AiGatewayResource
 *
 * @summary list AiGatewayApiKeyResource resources by AiGatewayResource
 * x-ms-original-file: 2026-11-01/AiGatewayApiKeyList.json
 */
async function listAIGatewayAPIKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiGatewayApiKeyResources.listByAiGateway(
    "example-rg",
    "example-gateway",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAIGatewayAPIKeys();
}

main().catch(console.error);
