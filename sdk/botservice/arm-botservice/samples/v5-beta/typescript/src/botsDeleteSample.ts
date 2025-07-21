// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Bot Service from the resource group.
 *
 * @summary deletes a Bot Service from the resource group.
 * x-ms-original-file: 2023-09-15-preview/DeleteBot.json
 */
async function deleteBot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  await client.bots.delete("OneResourceGroupName", "samplebotname");
}

async function main(): Promise<void> {
  await deleteBot();
}

main().catch(console.error);
