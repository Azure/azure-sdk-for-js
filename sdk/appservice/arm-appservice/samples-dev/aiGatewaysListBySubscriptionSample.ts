// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AiGateway resources by subscription ID
 *
 * @summary list AiGateway resources by subscription ID
 * x-ms-original-file: 2026-03-15/AIGateways_ListBySubscription.json
 */
async function listAiGatewaysBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiGateways.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAiGatewaysBySubscription();
}

main().catch(console.error);
