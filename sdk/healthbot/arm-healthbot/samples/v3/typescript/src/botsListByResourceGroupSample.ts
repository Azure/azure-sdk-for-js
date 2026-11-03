// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthbotClient } from "@azure/arm-healthbot";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns all the resources of a particular type belonging to a resource group
 *
 * @summary returns all the resources of a particular type belonging to a resource group
 * x-ms-original-file: 2025-11-01/ListBotsByResourceGroup.json
 */
async function listBotsByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new HealthbotClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bots.listByResourceGroup("OneResourceGroupName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBotsByResourceGroup();
}

main().catch(console.error);
