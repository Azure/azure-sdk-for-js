// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the available Service Providers for creating Connection Settings
 *
 * @summary lists the available Service Providers for creating Connection Settings
 * x-ms-original-file: 2023-09-15-preview/ListServiceProviders.json
 */
async function listAuthServiceProviders() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.botConnection.listServiceProviders();
  console.log(result);
}

async function main() {
  await listAuthServiceProviders();
}

main().catch(console.error);
