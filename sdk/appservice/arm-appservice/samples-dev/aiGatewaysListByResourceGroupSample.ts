// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AiGateway resources by resource group
 *
 * @summary list AiGateway resources by resource group
 * x-ms-original-file: 2026-03-15/AIGateways_ListByResourceGroup.json
 */
async function listAiGatewaysByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiGateways.listByResourceGroup("testrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAiGatewaysByResourceGroup();
}

main().catch(console.error);
