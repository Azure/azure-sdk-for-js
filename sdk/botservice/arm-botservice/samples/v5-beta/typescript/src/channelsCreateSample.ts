// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a Channel registration for a Bot Service
 *
 * @summary creates a Channel registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/PutAlexaChannel.json
 */
async function createAlexaChannel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.create(
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
 * This sample demonstrates how to creates a Channel registration for a Bot Service
 *
 * @summary creates a Channel registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/PutChannel.json
 */
async function createChannel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.create(
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
 * This sample demonstrates how to creates a Channel registration for a Bot Service
 *
 * @summary creates a Channel registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/PutDirectLineSpeechChannel.json
 */
async function createDirectLineSpeechChannel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.create(
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
 * This sample demonstrates how to creates a Channel registration for a Bot Service
 *
 * @summary creates a Channel registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/PutEmailChannel.json
 */
async function createEmailChannel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.create(
    "OneResourceGroupName",
    "samplebotname",
    "EmailChannel",
    {
      location: "global",
      properties: {
        channelName: "EmailChannel",
        properties: {
          authMethod: 1,
          emailAddress: "a@b.com",
          isEnabled: true,
          magicCode: "000000",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a Channel registration for a Bot Service
 *
 * @summary creates a Channel registration for a Bot Service
 * x-ms-original-file: 2023-09-15-preview/PutLineChannel.json
 */
async function createLineChannel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.channels.create(
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

async function main(): Promise<void> {
  await createAlexaChannel();
  await createChannel();
  await createDirectLineSpeechChannel();
  await createEmailChannel();
  await createLineChannel();
}

main().catch(console.error);
