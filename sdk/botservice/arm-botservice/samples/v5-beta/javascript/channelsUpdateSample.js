// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BotServiceClient } = require("@azure/arm-botservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a Channel registration for a Bot Service
 *
 * @summary updates a Channel registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/UpdateAlexaChannel.json
 */
async function updateAlexaChannel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.update(
    "OneResourceGroupName",
    "samplebotname",
    "AlexaChannel",
    {
      location: "global",
      properties: {
        channelName: "AlexaChannel",
        properties: { alexaSkillId: "XAlexaSkillIdX", isEnabled: true },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a Channel registration for a Bot Service
 *
 * @summary updates a Channel registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/UpdateChannel.json
 */
async function updateChannel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.update(
    "OneResourceGroupName",
    "samplebotname",
    "EmailChannel",
    {
      location: "global",
      properties: {
        channelName: "EmailChannel",
        properties: {
          emailAddress: "a@b.com",
          isEnabled: true,
          password: "pwd",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a Channel registration for a Bot Service
 *
 * @summary updates a Channel registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/UpdateDirectLineSpeechChannel.json
 */
async function updateDirectLineSpeechChannel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.update(
    "OneResourceGroupName",
    "samplebotname",
    "DirectLineSpeechChannel",
    {
      location: "global",
      properties: {
        channelName: "DirectLineSpeechChannel",
        properties: {
          cognitiveServiceRegion: "XcognitiveServiceRegionX",
          cognitiveServiceSubscriptionKey: "XcognitiveServiceSubscriptionKeyX",
          isEnabled: true,
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a Channel registration for a Bot Service
 *
 * @summary updates a Channel registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/UpdateLineChannel.json
 */
async function updateLineChannel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.update(
    "OneResourceGroupName",
    "samplebotname",
    "LineChannel",
    {
      location: "global",
      properties: {
        channelName: "LineChannel",
        properties: {
          lineRegistrations: [
            {
              channelAccessToken: "channelAccessToken",
              channelSecret: "channelSecret",
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await updateAlexaChannel();
  await updateChannel();
  await updateDirectLineSpeechChannel();
  await updateLineChannel();
}

main().catch(console.error);
