// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Network Security Perimeter configurations associated with the Bot.
 *
 * @summary list Network Security Perimeter configurations associated with the Bot.
 * x-ms-original-file: 2023-09-15-preview/ListNetworkSecurityPerimeterConfigurations.json
 */
async function listNetworkSecurityPerimeterConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new BotServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterConfigurations.list("rgName", "botId")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listNetworkSecurityPerimeterConfigurations();
}

main().catch(console.error);
