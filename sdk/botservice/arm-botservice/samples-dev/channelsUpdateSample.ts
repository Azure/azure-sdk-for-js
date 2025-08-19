// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ChannelsUpdateOptionalParams,
  EmailChannel,
  AlexaChannel,
  LineChannel,
  DirectLineSpeechChannel,
} from "@azure/arm-botservice";
import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a Channel registration for a Bot Service
 *
 * @summary Updates a Channel registration for a Bot Service
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/UpdateAlexaChannel.json
 */
async function updateAlexaChannel(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const channelName = "AlexaChannel";
  const location = "global";
  const properties: AlexaChannel = {
    channelName: "AlexaChannel",
    properties: { alexaSkillId: "XAlexaSkillIdX", isEnabled: true },
  };
  const options: ChannelsUpdateOptionalParams = { location, properties };
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.channels.update(
    resourceGroupName,
    resourceName,
    channelName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates a Channel registration for a Bot Service
 *
 * @summary Updates a Channel registration for a Bot Service
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/UpdateChannel.json
 */
async function updateChannel(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const channelName = "EmailChannel";
  const location = "global";
  const properties: EmailChannel = {
    channelName: "EmailChannel",
    properties: { emailAddress: "a@b.com", isEnabled: true, password: "pwd" },
  };
  const options: ChannelsUpdateOptionalParams = { location, properties };
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.channels.update(
    resourceGroupName,
    resourceName,
    channelName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates a Channel registration for a Bot Service
 *
 * @summary Updates a Channel registration for a Bot Service
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/UpdateDirectLineSpeechChannel.json
 */
async function updateDirectLineSpeechChannel(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const channelName = "DirectLineSpeechChannel";
  const location = "global";
  const properties: DirectLineSpeechChannel = {
    channelName: "DirectLineSpeechChannel",
    properties: {
      cognitiveServiceRegion: "XcognitiveServiceRegionX",
      cognitiveServiceSubscriptionKey: "XcognitiveServiceSubscriptionKeyX",
      isEnabled: true,
    },
  };
  const options: ChannelsUpdateOptionalParams = { location, properties };
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.channels.update(
    resourceGroupName,
    resourceName,
    channelName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates a Channel registration for a Bot Service
 *
 * @summary Updates a Channel registration for a Bot Service
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/UpdateLineChannel.json
 */
async function updateLineChannel(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const channelName = "LineChannel";
  const location = "global";
  const properties: LineChannel = {
    channelName: "LineChannel",
    properties: {
      lineRegistrations: [
        {
          channelAccessToken: "channelAccessToken",
          channelSecret: "channelSecret",
        },
      ],
    },
  };
  const options: ChannelsUpdateOptionalParams = { location, properties };
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.channels.update(
    resourceGroupName,
    resourceName,
    channelName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAlexaChannel();
  await updateChannel();
  await updateDirectLineSpeechChannel();
  await updateLineChannel();
}

main().catch(console.error);
