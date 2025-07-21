// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Bot Service from the resource group.
 *
 * @summary deletes a Bot Service from the resource group.
 * x-ms-original-file: 2023-09-15-preview/DeleteBot.json
 */
async function deleteBot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  await client.bots.delete("OneResourceGroupName", "samplebotname");
}

async function main() {
  await deleteBot();
}

main().catch(console.error);
