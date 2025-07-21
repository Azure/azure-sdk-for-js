// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a BotService Channel registration specified by the parameters.
 *
 * @summary returns a BotService Channel registration specified by the parameters.
 * x-ms-original-file: 2023-09-15-preview/GetAlexaChannel.json
 */
async function getAlexaChannel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.get("OneResourceGroupName", "samplebotname", "AlexaChannel");
  console.log(result);
}

/**
 * This sample demonstrates how to returns a BotService Channel registration specified by the parameters.
 *
 * @summary returns a BotService Channel registration specified by the parameters.
 * x-ms-original-file: 2023-09-15-preview/GetChannel.json
 */
async function getChannel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.get("OneResourceGroupName", "samplebotname", "EmailChannel");
  console.log(result);
}

/**
 * This sample demonstrates how to returns a BotService Channel registration specified by the parameters.
 *
 * @summary returns a BotService Channel registration specified by the parameters.
 * x-ms-original-file: 2023-09-15-preview/GetDirectLineSpeechChannel.json
 */
async function getDirectLineSpeechChannel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.get(
    "OneResourceGroupName",
    "samplebotname",
    "DirectLineSpeechChannel",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to returns a BotService Channel registration specified by the parameters.
 *
 * @summary returns a BotService Channel registration specified by the parameters.
 * x-ms-original-file: 2023-09-15-preview/GetLineChannel.json
 */
async function getLineChannel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.get("OneResourceGroupName", "samplebotname", "LineChannel");
  console.log(result);
}

async function main() {
  await getAlexaChannel();
  await getChannel();
  await getDirectLineSpeechChannel();
  await getLineChannel();
}

main().catch(console.error);
