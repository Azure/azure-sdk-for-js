// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AiGateway
 *
 * @summary get a AiGateway
 * x-ms-original-file: 2026-03-15/AIGateways_Get.json
 */
async function getAiGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.aiGateways.get("testrg", "aigateway1");
  console.log(result);
}

async function main(): Promise<void> {
  await getAiGateway();
}

main().catch(console.error);
