// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AiGatewayResource resources by subscription ID
 *
 * @summary list AiGatewayResource resources by subscription ID
 * x-ms-original-file: 2026-09-01-preview/AiGatewayListBySubscription.json
 */
async function listAIGatewaysBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiGatewayResources.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAIGatewaysBySubscription();
}

main().catch(console.error);
