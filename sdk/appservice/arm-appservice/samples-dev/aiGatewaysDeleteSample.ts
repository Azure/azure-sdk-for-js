// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a AiGateway
 *
 * @summary delete a AiGateway
 * x-ms-original-file: 2026-03-15/AIGateways_Delete.json
 */
async function deleteAiGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.aiGateways.delete("testrg", "aigateway1");
}

async function main(): Promise<void> {
  await deleteAiGateway();
}

main().catch(console.error);
