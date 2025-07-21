// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Channel registration from a Bot Service
 *
 * @summary deletes a Channel registration from a Bot Service
 * x-ms-original-file: 2023-09-15-preview/DeleteChannel.json
 */
async function deleteChannel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  await client.channels.delete("OneResourceGroupName", "samplebotname", "EmailChannel");
}

/**
 * This sample demonstrates how to deletes a Channel registration from a Bot Service
 *
 * @summary deletes a Channel registration from a Bot Service
 * x-ms-original-file: 2023-09-15-preview/DeleteDirectLineSpeechChannel.json
 */
async function deleteDirectLineSpeechChannel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  await client.channels.delete("OneResourceGroupName", "samplebotname", "DirectLineSpeechChannel");
}

async function main(): Promise<void> {
  await deleteChannel();
  await deleteDirectLineSpeechChannel();
}

main().catch(console.error);
