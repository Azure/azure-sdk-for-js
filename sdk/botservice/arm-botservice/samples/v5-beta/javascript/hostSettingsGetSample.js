// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get per subscription settings needed to host bot in compute resource such as Azure App Service
 *
 * @summary get per subscription settings needed to host bot in compute resource such as Azure App Service
 * x-ms-original-file: 2023-09-15-preview/GetHostSettings.json
 */
async function getBotHostSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.hostSettings.get();
  console.log(result);
}

async function main() {
  await getBotHostSettings();
}

main().catch(console.error);
