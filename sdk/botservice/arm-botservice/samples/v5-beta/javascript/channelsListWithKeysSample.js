// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a Channel registration for a Bot Service including secrets
 *
 * @summary lists a Channel registration for a Bot Service including secrets
 * x-ms-original-file: 2023-09-15-preview/ListChannel.json
 */
async function listChannel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.listWithKeys(
    "OneResourceGroupName",
    "samplebotname",
    "EmailChannel",
  );
  console.log(result);
}

async function main() {
  await listChannel();
}

main().catch(console.error);
