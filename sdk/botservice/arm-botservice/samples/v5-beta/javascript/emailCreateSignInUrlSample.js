// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an email channel sign in url for a Bot Service
 *
 * @summary creates an email channel sign in url for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/CreateEmailSignInUrl.json
 */
async function createUrl() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.email.createSignInUrl("OneResourceGroupName", "samplebotname");
  console.log(result);
}

async function main() {
  await createUrl();
}

main().catch(console.error);
