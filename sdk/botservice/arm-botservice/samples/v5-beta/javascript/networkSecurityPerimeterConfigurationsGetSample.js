// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Network Security Perimeter configuration associated with the Bot.
 *
 * @summary gets the specified Network Security Perimeter configuration associated with the Bot.
 * x-ms-original-file: 2023-09-15-preview/GetNetworkSecurityPerimeterConfiguration.json
 */
async function getNetworkSecurityPerimeterConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.get(
    "rgName",
    "botId",
    "00000000-0000-0000-0000-000000000000.associationName",
  );
  console.log(result);
}

async function main() {
  await getNetworkSecurityPerimeterConfiguration();
}

main().catch(console.error);
