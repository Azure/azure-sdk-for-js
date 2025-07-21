// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns all the Channel registrations of a particular BotService resource
 *
 * @summary returns all the Channel registrations of a particular BotService resource
 * x-ms-original-file: 2023-09-15-preview/ListChannelsByBotService.json
 */
async function listChannelsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.channels.listByResourceGroup(
    "OneResourceGroupName",
    "samplebotname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listChannelsByResourceGroup();
}

main().catch(console.error);
