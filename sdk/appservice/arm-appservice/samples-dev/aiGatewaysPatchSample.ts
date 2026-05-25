// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a AiGateway
 *
 * @summary update a AiGateway
 * x-ms-original-file: 2026-03-15/AIGateways_Patch.json
 */
async function patchAiGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.aiGateways.patch("testrg", "aigateway1", {
    tags: { key1: "Value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchAiGateway();
}

main().catch(console.error);
