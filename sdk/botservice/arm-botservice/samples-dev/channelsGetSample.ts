// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns a BotService Channel registration specified by the parameters.
 *
 * @summary Returns a BotService Channel registration specified by the parameters.
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/GetAlexaChannel.json
 */
async function getAlexaChannel(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const channelName = "AlexaChannel";
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.channels.get(resourceGroupName, resourceName, channelName);
  console.log(result);
}

/**
 * This sample demonstrates how to Returns a BotService Channel registration specified by the parameters.
 *
 * @summary Returns a BotService Channel registration specified by the parameters.
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/GetChannel.json
 */
async function getChannel(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const channelName = "EmailChannel";
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.channels.get(resourceGroupName, resourceName, channelName);
  console.log(result);
}

/**
 * This sample demonstrates how to Returns a BotService Channel registration specified by the parameters.
 *
 * @summary Returns a BotService Channel registration specified by the parameters.
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/GetDirectLineSpeechChannel.json
 */
async function getDirectLineSpeechChannel(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const channelName = "DirectLineSpeechChannel";
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.channels.get(resourceGroupName, resourceName, channelName);
  console.log(result);
}

/**
 * This sample demonstrates how to Returns a BotService Channel registration specified by the parameters.
 *
 * @summary Returns a BotService Channel registration specified by the parameters.
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/GetLineChannel.json
 */
async function getLineChannel(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const channelName = "LineChannel";
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.channels.get(resourceGroupName, resourceName, channelName);
  console.log(result);
}

async function main(): Promise<void> {
  await getAlexaChannel();
  await getChannel();
  await getDirectLineSpeechChannel();
  await getLineChannel();
}

main().catch(console.error);
