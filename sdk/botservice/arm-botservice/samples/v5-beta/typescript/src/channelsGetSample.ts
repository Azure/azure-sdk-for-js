// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a BotService Channel registration specified by the parameters.
 *
 * @summary returns a BotService Channel registration specified by the parameters.
 * x-ms-original-file: 2023-09-15-preview/GetAlexaChannel.json
 */
async function getAlexaChannel(): Promise<void> {
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
async function getChannel(): Promise<void> {
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
async function getDirectLineSpeechChannel(): Promise<void> {
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
async function getLineChannel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.get("OneResourceGroupName", "samplebotname", "LineChannel");
  console.log(result);
}

async function main(): Promise<void> {
  await getAlexaChannel();
  await getChannel();
  await getDirectLineSpeechChannel();
  await getLineChannel();
}

main().catch(console.error);
