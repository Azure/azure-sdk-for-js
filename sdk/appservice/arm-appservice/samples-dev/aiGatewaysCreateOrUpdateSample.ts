// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a AiGateway
 *
 * @summary create a AiGateway
 * x-ms-original-file: 2026-03-15/AIGateways_CreateOrUpdate.json
 */
async function createOrUpdateAiGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.aiGateways.createOrUpdate("testrg", "aigateway1", {
    properties: {},
    location: "CentralUS",
    tags: { key1: "Value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAiGateway();
}

main().catch(console.error);
